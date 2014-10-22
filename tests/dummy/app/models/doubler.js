import Ember from 'ember';

export default Ember.Object.extend({
  doubled: function() {
    window.abc = 42;
    return this.get('num')*2;
  }.property("num"),

  tripled: function() {
    return this.get('num')*3;
  }.property("num")
});