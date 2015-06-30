import Ember from "ember";

var Issue = Ember.Object.extend({
  asJSON: function(){
    return JSON.stringify(this);
  }.property("_data.order")
});

export default Issue;
