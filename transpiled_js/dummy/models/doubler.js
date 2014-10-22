define("dummy/models/doubler", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Object.extend({
      doubled: function() {
        window.abc = 42;
        return this.get('num')*2;
      }.property("num"),

      tripled: function() {
        return this.get('num')*3;
      }.property("num")
    });
  });