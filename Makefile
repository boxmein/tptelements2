# Makefile, replaces the Rakefile

# https://github.com/sass/sassc
SASSC=sassc
# `npm install -g jade`
JADEC=jade
# `npm install -g json-minify`
JSON_MINIFY=json-minify

.PHONY: all css refs

build: 
	mkdir build

build/css: build
	mkdir build/css

build/reference: build
	mkdir build/reference

#
# Generate the Lua reference
# 

build/reference/lua-reference.html: build/reference data/references/lua-reference.jade base_jade/layout.jade base_jade/header.jade base_jade/footer.jade
	cp base_jade/header.jade base_jade/footer.jade base_jade/layout.jade data/references/
	$(JADEC) data/references/lua-reference.jade -o build/lua-reference.html
	rm data/references/layout.jade data/references/header.jade data/references/footer.jade

build/reference/save-format.html: data/references/save-format.html
	cp $< $@

refs: build/reference/save-format.html build/reference/lua-reference.html

# 
# Build the CSS
# 

# haven't *quite* figured out what I can percent-match and how
build/css/lua-reference.css: build/css styles/lua-reference.scss
	$(SASSC) styles/lua-reference.scss $@

build/css/print.css: build/css styles/print.scss
	$(SASSC) styles/print.scss $@

build/css/screen.css: build/css styles/screen.scss
	$(SASSC) styles/screen.scss $@

css: build/css/print.css build/css/screen.css build/css/lua-reference.css


# 
# search.lzw for the API Search thing
# 

data/search.json: $(SEARCH_JSON_ENTRY_DIR)
	node "tools/generate search.json.js" $< >$@

build/search.lzw: data/search.json
	$(JSON_MINIFY) $< > ./temp_garbage_19510295.json
	node "tools/pack search.json with lzw.js" ./temp_garbage_19510295.json >$@
	rm ./temp_garbage_19510295.json
