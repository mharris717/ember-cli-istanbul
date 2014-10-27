'use strict';

// var Istanbul = require('istanbul')
// var instrumenter = new Istanbul.Instrumenter()
// // var changed = instrumenter.instrumentSync('function meaningOfLife() { return 42; }', 'filename.js');
// // console.log(changed)

// var IstanbulPreprocessor = require("./lib/istanbul-preprocessor")

var path = require("path")

var sup = {
  name: "eci:hello",

  run: function() {
    console.log("hello from ember-cli-istanbul")
  }
};

var runCoverage = {
  name: "istanbul:coverage-server",

  run: function() {
    // var file = "./lib/coverage_server";
    // var fullFile = path.resolve(file);
    // console.log("node " + fullFile + ".js")
    // require(file)
    //console.log("running")

    var root = path.resolve(".")
    var file = root + "/node_modules/ember-cli-istanbul/lib/coverage_server.js"
    console.log("Run this: node " + file)
  }
};

// var shellTest = {
//   name: "shell-test",

//   run: function() {
//     var sys = require('sys')
//     var exec = require('child_process').exec;
//     function puts(error, stdout, stderr) { sys.puts(stdout) }
//     exec("ls -la", puts);
//   }
// }

// function EmberCliIstanbul(proj) {
//   this.name = "ember-cli-istanbul";
//   this.appName = proj.name();
// }

// EmberCliIstanbul.prototype.included = function(app) {
//   console.log("in eci included");
//   var beforeFunc = require("./lib/istanbul-concat-filter");
//   app.options.beforeOutputPushFunc = beforeFunc(app.name);
// }

// module.exports = EmberCliIstanbul


module.exports = {
  name: "ember-cli-istanbul",

  // included: function(app) {
  //   //console.log("included");
  //   this.app = app;
  //   var plugin = new IstanbulPreprocessor({});
  //   this.app.registry.add('js', plugin);
  // },

  included: function(app) {
    console.log("in eci included");
    var beforeFunc = require("./lib/istanbul-concat-filter");
    app.options.beforeOutputPushFunc = beforeFunc(app.name);
  },

  includedCommands: function() {
    return [sup,runCoverage]
  }

  // sayHello: function() {
  //   console.log("hello");
  // }
}
