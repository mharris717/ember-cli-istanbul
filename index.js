'use strict';

var Istanbul = require('istanbul')
var instrumenter = new Istanbul.Instrumenter()
// var changed = instrumenter.instrumentSync('function meaningOfLife() { return 42; }', 'filename.js');
// console.log(changed)

// var Filter = require('broccoli-filter')

// function IstanbulFilter(inputTree,options) {
//   if (!(this instanceof IstanbulFilter)) return new IstanbulFilter(inputTree,options);
//   Filter.call(this,inputTree,options)
//   options = options || {}

// }

// IstanbulFilter.prototype = Object.create(Filter.prototype);
// IstanbulFilter.prototype.constructor = IstanbulFilter

// IstanbulFilter.prototype.extensions = ['js']
// IstanbulFilter.prototype.targetExtensions = 'js'

// IstanbulFilter.prototype.processString = function(string) {
//   //console.log("processString")
//   //console.log(string)
//   //var res = instrumenter.instrumentSync(string,'filename.js')
//   //return res
//   return string
//   //return "zzz"
// }

var IstanbulFilter = require("./lib/istanbul-filter")

function IstanbulPreprocessor(options) {
  this.name = 'ember-cli-istanbul';
  this.ext = 'js';
  this.options = options || {};
}

IstanbulPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  //console.log("toTree");
  var options = {
    bare: true,
    srcDir: inputPath,
    destDir: outputPath
  };

  return IstanbulFilter(tree,options);
};



// function IstanbulAddon(project) {
//   this._project = project;
//   // console.log(project.addons)
//   this.name     = 'Ember CLI Istanbul Addon';
// }

// IstanbulAddon.prototype.treeFor = function() {};

// IstanbulAddon.included = function(app) {
//   sadfsdfsdf();
//   console.log("included");

//   this.app = app;

//   var plugin = new IstanbulPreprocessor({});

//   this.app.registry.add('js', plugin);
// }

//module.exports = IstanbulAddon

module.exports = {
  name: "sdfsdfsd",

  included: function(app) {
    //console.log("included");

    this.app = app;

    var plugin = new IstanbulPreprocessor({});

    this.app.registry.add('js', plugin);
  }
}
