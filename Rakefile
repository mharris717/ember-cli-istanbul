require 'mharris_ext'

def istanbul_root
  File.expand_path(File.dirname(__FILE__))
end

def root
  File.expand_path(Dir.getwd)
end

def setup
  if FileTest.exist?("#{root}/coverage.json")
    FileUtils.rm "#{root}/coverage.json"
  end

  if FileTest.exist?("#{root}/coverage")
    FileUtils.rm_r "#{root}/coverage"
  end

  ec "grunt broccoli:transpiled:build"
end

def coverage_json_ready?
  file = "#{root}/coverage.json"
  return false unless FileTest.exist?(file)
  body = File.read(file)
  body.length > 20
end

def wait_for_coverage_json
  30.times do
    if coverage_json_ready?
      sleep 1
      return
    end

    sleep 1
  end
  raise "no coverage.json"
end

task :test do
  setup

  read_io, write_io = IO.pipe

  pid = fork do
    exec "node #{istanbul_root}/lib/coverage_server.js"
  end

  pid2 = fork do
    write_io.close
    STDIN.reopen(read_io)
    exec "ember test --server"
  end

  read_io.close

  # 6.times do
  #   puts "Waiting #{Time.now}"
  #   sleep 1
  # end

  wait_for_coverage_json


  write_io.write("q")
  write_io.close



  puts "Killing #{pid} #{pid2}"

  Process.kill "KILL",pid
  # Process.kill "KILL",pid2

  # File.create("ran.txt",Time.now.to_s)

  cov = File.read("#{root}/coverage.json")
  raise "bad coverage" if cov.length < 20

  exec "istanbul report"
end

task :a do
  read_io, write_io = IO.pipe

  pid = fork do
    write_io.close
    STDIN.reopen(read_io)

    sleep 0.01
    exec "rake wait_for_q"
  end

  # puts pid

  # sleep 0.1
  # Process.kill "KILL",pid

  read_io.close

  sleep 0.5
  write_io.write("q")
  write_io.close

  sleep 0.1
  puts 'ending'
  #Process.kill 'KILL',pid
end

task :wait_for_q do
  loop do
    res = STDIN.gets
    puts "Got: #{res}" if res.to_s.strip != ''
    if res.to_s.strip == 'q'
      puts "got q, exiting"
      exit
    end 
  end
end

task :open_cov do
  ec "open #{root}/coverage/lcov-report/index.html"
end

task :copy_lib_files do
  files = ["node_modules/ember-cli/lib/broccoli/ember-app.js",
           "node_modules/ember-cli/node_modules/broccoli-es6-concatenator/index.js"]

  source_root = "/code/orig/page_copy"
  target_root = root

  files.each do |file|
    dir = File.dirname(file)
    FileUtils.rm "#{target_root}/#{file}"
    FileUtils.cp "#{source_root}/#{file}","#{target_root}/#{dir}"
  end
end

task :link_libs do
  ec "npm link write-transpiled"
  ec "npm link ember-cli-istanbul"
end

task :add_libs do
  ec "npm install grunt --save-dev"
  ec "npm install grunt-broccoli --save-dev"
end

task :prompt_npm_install do
  puts "run npm install and bower install if appropriate"
  STDIN.gets
end

task :prompt_pastes do
  testem = <<EOF
  <script>
  Testem.on('all-test-results', function(results){
    console.log("Inside all-test-results");
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:7358/')
    xhr.send(JSON.stringify(window.__coverage__))
    //xhr.send(JSON.stringify(window.coverage))
    console.log("end all-test-results");
  })
  </script>
EOF

  puts "paste rakefile\n" + 'load "/code/orig/ember-cli-istanbul/Rakefile"'
  puts "paste gruntfile\n" + 'module.exports = function(grunt) {
  require("write-transpiled")(grunt)
}'
  puts "paste testem\n#{testem}"
  STDIN.gets
end


task :add_all => [:link_libs,:add_libs,:prompt_npm_install,:prompt_pastes,:copy_lib_files] do
  
end
