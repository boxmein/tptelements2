# Makefile, replaces the Rakefile

# https://github.com/sass/sassc
SASSC=sassc
# `npm install -g jade`
JADEC=jade
# `npm install -g json-minify` 
# (needed if you want to generate search.json, which may or may not be possible)
JSON_MINIFY=json-minify 

.PHONY: all css js refs

all: css js refs editor_templates build/index.html build/editor.html

# 
# Generate the index page
# 

build/index.html: base_jade/index.jade base_jade/layout.jade base_jade/header.jade base_jade/footer.jade
	mkdir -p build
	jade $< -o build

# 
# Generate the editor page
#

build/editor.html: base_jade/editor.jade base_jade/layout.jade base_jade/header.jade base_jade/footer.jade
	mkdir -p build
	jade $< -o build

#
# Copy over the code editor templates
# 

build/editors/%: data/editors/%
	mkdir -p build/editors
	cp $< $@

editor_templates: build/editors/c build/editors/c++ build/editors/lua

#
# Generate the Lua reference
# 

build/reference/lua-reference.html: data/references/lua-reference.jade base_jade/layout.jade base_jade/header.jade base_jade/footer.jade
	mkdir -p build/reference
	cp base_jade/header.jade base_jade/footer.jade base_jade/layout.jade data/references/
	$(JADEC) data/references/lua-reference.jade -o build/reference
	rm data/references/layout.jade data/references/header.jade data/references/footer.jade

build/reference/save-format.html: data/references/save-format.html
	mkdir -p build/reference
	cp data/references/save-format.html $@

refs: build/reference/save-format.html build/reference/lua-reference.html

# 
# Build the CSS
# 

# haven't *quite* figured out what I can percent-match and how
build/css/lua-reference.css: styles/lua-reference.scss
	mkdir -p build/css
	$(SASSC) styles/lua-reference.scss $@

build/css/print.css: styles/print.scss
	mkdir -p build/css
	$(SASSC) styles/print.scss $@

build/css/screen.css: styles/screen.scss
	mkdir -p build/css
	$(SASSC) styles/screen.scss $@

css: build/css/print.css build/css/screen.css build/css/lua-reference.css


# 
# Copy all content in "static" into "build"
# 

build/js: static/js
	mkdir -p build
	cp -a $< build

build/highlightjs: static/highlightjs
	mkdir -p build
	cp -a $< build

build/ace-editor: static/ace-editor
	mkdir -p build
	cp -a $< build

js: build/js build/highlightjs build/ace-editor

# 
# search.lzw for the API Search thing
# 

data/search.json: $(SEARCH_JSON_ENTRY_DIR)
	node "tools/generate search.json.js" $< >$@

build/search.lzw: data/search.json
	$(JSON_MINIFY) $< > ./temp_garbage_19510295.json
	node "tools/pack search.json with lzw.js" ./temp_garbage_19510295.json >$@
	rm ./temp_garbage_19510295.json
