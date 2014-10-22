import { test } from 'ember-qunit';
import Doubler from '../../models/doubler';

module("doubler");

test("smoke", function() {
  var doubler = Doubler.create({num: 3});
  var res = doubler.get('doubled');
  equal(res,6);
});

function TestObj(inputTree, options) {
  console.log("here");
}

//TestObj.prototype = Object.create()
TestObj.prototype.constructor = TestObj;

TestObj.prototype.getNum = function() {
  return this.num;
};

TestObj.prototype.getNumEval = function() {
  var self = this;
  var res = eval("var thing = (function() { return self; })(); thing.num");
  return res;
};

test("eval smoke", function() {
  var obj = new TestObj();
  obj.num = 14;
  equal(obj.getNum(),14);
  equal(obj.getNumEval(),14);
});