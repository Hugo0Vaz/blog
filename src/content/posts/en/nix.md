---
title: "Nix, NixOS and Nix package manager"
date: 2026-06-06
locale: en
description: "My journey of Nix"
author: Hugo0Vaz
---

I remember first thinking about dipping my toes in Nix, a fool a attracted to all
shiny things I went right into it, downloaded the installer, burned a usb stick
and booted the NixOS installer. That right there would be the start of a to this
date 656 commits long tale of pain, discovery and self-doubt (mostly confirmed).

# The start

A very important distinction to be drawed and that can lead to a lot of confusion
is that when we the users of Nix say *Nix*, we might mean:
- Nix, the language.
- Nix, the package manager, built on-top of nixlang.
- NixOS, the linux operating system built on-top of nixpkgs and nixlang.

For ease of undesting when refererring to:
- The operating system, it will be referred as nixos.
- The language, it will be refereed as nixlang.
- The package manager (altough technically incorrect), will be referres as nix.

The core idea of Nix is to enable the declarative definition of packages. Much
like Node's `package.json ` and Composer's `composer.json` it declaratively installs
packages.

The declarative nature allows for guaranteed reproducibility besides allowing a 
configurations to be stored in version control softwares.

## Why?

### Everything, everywhere all at once

As a very curios person that likes to speds time tinkering with computers, nixos
represented an oportunity that no other distro or operating system offers.

After years of editing config files and saving the in git repositories, I was tired
of managing each and every configuration for all my hosts. Nixlang allows me to 
define in it's configuration how I want to build my host, exposing me several options.


```shell
commit 455f6367a3a685a9832edccc78a576a2d40389cc
Author: Hugo Martins Vaz Silva <Hugo0Vaz>
Date:   Thu Jul 4 13:31:42 2024 -0300

    importando o repositório de dotfiles

commit a8986e1e9db00912f306ef2ac5bac73584ec3271
Author: Hugo Vaz <hugomartinsvaz@gmail.com>
Date:   Thu Jul 4 13:20:44 2024 -0300

    Initial commit

```

## Why Markdown?

Markdown makes it easy to write content without worrying about HTML. You can add:

- Lists
- **Bold** and *italic* text
- [Links](https://astro.build)
- And much more!
