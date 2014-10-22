define("dummy/tests/unit/smoke-test", 
  ["ember-qunit","dummy/models/doubler"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var test = __dependency1__.test;
    var Doubler = __dependency2__["default"];

    module("doubler");

    test("smoke", function() {
      var doubler = Doubler.create({num: 3});
      var res = doubler.get('doubled');
      equal(res,6);
    });

    function TestObj(inputTree, options) {
      //console.log("here");
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

    asyncTest("wait here", function() {
      setTimeout(function() {
        QUnit.start();
        equal(2,2);
      },99999999999999999);
    });
  });