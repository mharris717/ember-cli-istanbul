import { test } from 'ember-qunit';
import Doubler from '../../models/doubler';

module("doubler");

test("smoke", function() {
  var doubler = Doubler.create({num: 3});
  var res = doubler.get('doubled');
  equal(res,6);
});