'use strict';

// var Istanbul = require('istanbul')
// var instrumenter = new Istanbul.Instrumenter()
// // var changed = instrumenter.instrumentSync('function meaningOfLife() { return 42; }', 'filename.js');
// // console.log(changed)

// var IstanbulPreprocessor = require("./lib/istanbul-preprocessor")

var sup = {
  name: "sup",

  run: function() {
    console.log("hello");
    return 14;
  }
};

var runCoverage = {
  name: "istanbul:coverage_server",

  run: function() {
    require("./lib/coverage_server")
  }
};

module.exports = {
  name: "ember-cli-istanbul",

  // included: function(app) {
  //   //console.log("included");
  //   this.app = app;
  //   var plugin = new IstanbulPreprocessor({});
  //   this.app.registry.add('js', plugin);
  // },

  included: function(app) {
    var beforeFunc = require("./lib/istanbul-concat-filter");
    app.options.beforeOutputPushFunc = beforeFunc;
  },

  includedCommands: function() {
    return [sup,runCoverage]
  }

  // sayHello: function() {
  //   console.log("hello");
  // }
}
