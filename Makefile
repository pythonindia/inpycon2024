.PHONY: prod dev dev-server

prod:
	npx @11ty/eleventy --pathprefix='/2024/'

dev:
	npx @11ty/eleventy --pathprefix='/'

dev-server:
	npx @11ty/eleventy --serve --pathprefix='/'
