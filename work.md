add:

"grunt": "^0.4.5",
"grunt-broccoli": "^0.3.7",
"write-transpiled": "",
"ember-cli-istanbul": ""
"ember-cli": "mharris717/ember-cli#istanbul"

npm install and link
bower install

<!-- paste the rakefile, gruntfile, coverage_server -->
<!-- paste in rakefile, gruntfile - can do without -->
paste testem script tag - gonna leave

<!-- hardcoded path in concat filter - fixed -->

<!--  add to brocfile - fixed -->

<!--  rake copy_lib_files -->

rake test - start cov server, run tests, istanbul report

<!-- node_modules/ember-cli/lib/broccoli/ember-app.js
node_modules/ember-cli/node_modules/broccoli-es6-concatenator/index.js -->

<!-- addon in write-transpiled - fixed -->
<!-- hardcoded addon name in cli-istanbul - fixed -->
pulls in addon app/ files and errors

paste in tests/index.html:

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

paste in Gruntfile.js:

module.exports = function(grunt) {
  require("write-transpiled").setupGrunt(grunt,'app-name')
}