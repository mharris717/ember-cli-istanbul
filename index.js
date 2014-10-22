'use strict';

var Istanbul = require('istanbul')
var instrumenter = new Istanbul.Instrumenter()
// var changed = instrumenter.instrumentSync('function meaningOfLife() { return 42; }', 'filename.js');
// console.log(changed)

var IstanbulPreprocessor = require("./lib/istanbul-preprocessor")

module.exports = {
  name: "ember-cli-istanbul",

  included: function(app) {
    //console.log("included");
    this.app = app;
    var plugin = new IstanbulPreprocessor({});
    this.app.registry.add('js', plugin);
  }
}
