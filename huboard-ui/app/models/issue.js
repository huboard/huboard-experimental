import Ember from "ember";

var Issue = Ember.Object.extend({
  columnIndex: Ember.computed.alias("column.index"),
  order: Ember.computed.alias("_data.order"),

  //Just a little helper for troubleshooting
  asJSON: function(){
    return JSON.stringify(this);
  }.property("_data.order", "column.index")
});

export default Issue;
