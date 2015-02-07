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

task :default => %w(compile_stylesheets lua_reference run)
