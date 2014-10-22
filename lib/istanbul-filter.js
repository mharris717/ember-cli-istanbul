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
  //console.log("processString")
  //console.log(string)
  //var res = instrumenter.instrumentSync(string,'filename.js')
  //return res
  return string
  //return "zzz"
}

module.exports = IstanbulFilter