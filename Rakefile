#!/usr/bin/ruby
## rake
require 'fileutils'
  puts "task :lua_reference"
desc "Generate the Lua reference"
task :lua_reference do

  puts "copying over temporary template files"

  # git + my computer both hate symlinking, apparently
  FileUtils.cp "views/layout.jade", "data/references/layout.jade"
  FileUtils.cp "views/header.jade", "data/references/header.jade"
  FileUtils.cp "views/footer.jade", "data/references/footer.jade"

  puts "jade-compiling the main template"
  puts `jade data/references/lua-reference.jade`

  puts "hopefully all went well, cleaning up template files"
  FileUtils.rm "data/references/layout.jade"
  FileUtils.rm "data/references/header.jade"
  FileUtils.rm "data/references/footer.jade"
  true
end




desc "Compile all SASS stylesheets"
task :compile_stylesheets do
  puts "task :compile_stylesheets"

  puts "invoking compass to do it for us"
  puts `compass compile`
end






desc "Generate the search page's data file"
task :search_data do
  puts "task :search_data"

  puts "minifying and compressing search.json..."
  puts `json-minify data/search.json > ./intermediate.json`
  puts `node "tools/pack search.json with lzw.js" ./intermediate.json > ./search.lzw`
  
  FileUtils.rm "./intermediate.json"
end





desc "Dump Lua variables in TPT (set ENV[TPT]=path to tpt)"
task :dump_luatree do 
  FileUtils.mkdir "tmp"
  FileUtils.cp "tools/dump tpt api.lua", "tmp/autorun.lua"

  raise unless ENV['TPT']

  FileUtils.cp ENV['TPT'], "./tmp"

  puts `tmp/Powder`

  # tpt sometimes removes it
  FileUtils.cp "tmp/stdout.txt", "tmp/dump.txt"
end

desc "Generate code trees for all the APIs (WIP)"
task :make_api_trees do raise end

desc "Run the TPTElements2 server"
task :run do 
  puts "use npm start now!"
end

task :default => %w(compile_stylesheets lua_reference run)
