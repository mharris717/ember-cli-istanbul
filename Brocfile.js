/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

// var IstanbulMain = require('./index')
// IstanbulMain.sayHello()

var Istanbul = require('istanbul')
var instrumenter = new Istanbul.Instrumenter({noCompact: true, embedSource: true})

var beforeFunc = function(string,ops) {
  //console.log("sourceFile: " + ops.sourceFile)
  //console.log("beforeOutputPushFunc from brocfile");

  var res = string;

  if (ops.moduleName == "dummy/models/doubler") {
    res = instrumenter.instrumentSync(string, "/code/orig/ember-cli-istanbul/transpiled_js/dummy/models/doubler.js");
    // res = instrumenter.instrumentSync(string, "/code/orig/ember-cli-istanbul/big.js");
    //res = instrumenter.instrumentSync(string, "/code/orig/ember-cli-istanbul/tests/dummy/app/models/doubler.js");
    res = res.replace("Function(\'return this\')","Function(\'return thisBeforeEval\')");
  }
  

  
  //res = res.replace("Function(\'return this\')","Function(\'return window\')");
  return res;
};

var app = new EmberAddon({
  beforeOutputPushFunc: beforeFunc,
  wrapInEvdal: false
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
