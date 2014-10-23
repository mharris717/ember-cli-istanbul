var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, resp){
  var d = new Date();
  console.log("in server " + d);

  var file = process.cwd() + "/coverage.json"
  req.pipe(fs.createWriteStream(file))
  resp.end()
})

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(7358);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:7358/");
