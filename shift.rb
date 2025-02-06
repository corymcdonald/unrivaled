#!/usr/bin/env ruby

require 'fileutils'

def shift_images(start_num, new_num)
  images = Dir.glob("*.jpg").sort_by { |f| f[/\d+/].to_i }

  mapping = {}
  shift = new_num - start_num

  images.each do |filename|
    num = filename[/\d+/].to_i
    next if num < start_num

    new_filename = filename.sub(/\d+/) { |n| (n.to_i + shift).to_s }
    mapping[filename] = new_filename
  end

  # Rename in reverse order to avoid overwriting
  mapping.keys.reverse.each do |old_name|
    FileUtils.mv(old_name, mapping[old_name])
  end
end

if ARGV.length != 2
  puts "Usage: shift_images.rb <start_num> <new_num>"
  exit 1
end

start_num = ARGV[0].to_i
new_num = ARGV[1].to_i

shift_images(start_num, new_num)
puts "Shifted images starting from #{start_num} to #{new_num} and adjusted subsequent images."
