require 'mharris_ext'

def root
  File.expand_path(File.dirname(__FILE__))
end

def setup
  if FileTest.exist?("#{root}/coverage.json")
    FileUtils.rm "#{root}/coverage.json"
  end

  if FileTest.exist?("#{root}/coverage")
    FileUtils.rm_r "#{root}/coverage"
  end
end

def coverage_json_ready?
  file = "#{root}/coverage.json"
  return false unless FileTest.exist?(file)
  body = File.read(file)
  body.length > 20
end

def wait_for_coverage_json
  10.times do
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
    exec "node coverage_server.js"
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

  cov = File.read("coverage.json")
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
  ec "open coverage/lcov-report/index.html"
end