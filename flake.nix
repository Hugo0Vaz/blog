{
  description = "Astro.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs@{ flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];

      perSystem = { system, ... }:
        let
          pkgs = import nixpkgs {
            inherit system;
            config.allowUnfree = true;
          };
          lib = pkgs.lib;
        in
        {
          packages.default = pkgs.stdenv.mkDerivation (finalAttrs: {
            pname = "fumbling-field";
            version = "0.0.1";

            src = lib.cleanSource ./.;

            nativeBuildInputs = with pkgs; [
              nodejs_22
              pnpm
              pnpmConfigHook
            ];

            pnpmDeps = pkgs.fetchPnpmDeps {
              inherit (finalAttrs) pname version src;
              fetcherVersion = 3;
              hash = "sha256-ZF7CLnQkVkpv4Xy9SgrPlkSB3NejoUZ0jhRmPrQEJGM=";
            };

            buildPhase = ''
              runHook preBuild
              pnpm run build
              runHook postBuild
            '';

            installPhase = ''
              runHook preInstall
              mkdir -p $out
              cp -r dist/* $out/
              runHook postInstall
            '';
          });

          devShells.default = pkgs.mkShell {
            name = "astro-dev";

            packages = with pkgs; [
              nodejs_22
              pnpm
              typescript
              typescript-language-server
              prettier
              git
              just
              tailwindcss-language-server
            ];

            shellHook = ''
              echo "🚀 Astro development environment ready!"
              echo "Installed tools:"
              echo "  Node.js  $(node --version)"
              echo "  pnpm     $(pnpm --version)"
              echo "  TypeScript (tsc $(tsc --version | cut -d' ' -f2))"
              echo ""
              echo "Quick start:"
              echo "  pnpm create astro@latest"
            '';
          };
        };
    };
}
