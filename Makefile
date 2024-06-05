dev:
	@hugo server

build:
	@hugo --minify --cleanDestinationDir --baseURL "https://hugovaz.dev"
