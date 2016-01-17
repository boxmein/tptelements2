# tptelements2

A quicker, slicker, sleeker, fleeker version of TPTElements. I just replaced all
the Node.js server-side code with client-side Makefile rendering. This thing 
runs on a Makefile!

## Using the site

Look at `views/index.md`, which is literally the index page of the website
itself.

## Running

### Dependencies

1. For the Makefile:
  - [sassc](https://github.com/sass/sassc) or equivalent for SASS stylesheets
  - [jade](https://jade-lang.org) for the templates
  - [json-minify](https://www.npmjs.com/package/json-minify) for search.json (not back up yet)

2. For the site:
  - [Ace Editor](https://ace.c9.io) for the editor **(included)**
  - [Highlight.js](https://highlightjs.org) with Lua/C/C++ and a theme **(included)**

### Actually running the site

1. Download this repo onto some directory on your workstation.
2. Run `make`. 
3. Copy the contents of the `build` directory into your web server.

## Credit

Assets and code (c) boxmein 2014. You can find the MIT license in the aptly
named file "LICENSE".

