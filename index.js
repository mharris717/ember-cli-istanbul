'use strict';

var Filter = require('broccoli-filter')

function IstanbulFilter(inputTree,options) {
  if (!(this instanceof IstanbulFilter)) return new IstanbulFilter(inputTree,options);
  Filter.call(this,inputTree,options)
  options = options || {}

}

IstanbulFilter.prototype = Object.create(Filter.prototype);
IstanbulFilter.prototype.constructor = IstanbulFilter

IstanbulFilter.prototype.extensions = ['js']
IstanbulFilter.prototype.targetExtensions = 'js'

IstanbulFilter.prototype.processString = function(string) {
  console.log("processString")
  return string
}


function IstanbulPreprocessor(options) {
  this.name = 'ember-cli-istanbul';
  this.ext = 'js';
  this.options = options || {};
}

IstanbulPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  console.log("toTree");
  var options = {
    bare: true,
    srcDir: inputPath,
    destDir: outputPath
  };

  return IstanbulFilter(tree,options);
};

module.exports = {
  name: 'ember-cli-istanbul',

  included: function(app) {
    console.log("included");

    this.app = app;

    var plugin = new IstanbulPreprocessor({});

    this.app.registry.add('js', plugin);
  }
};
