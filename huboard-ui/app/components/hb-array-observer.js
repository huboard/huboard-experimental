import Ember from "ember";

var HbArrayObserverComponent = Ember.Component.extend({
  classNames: ["array-observer"],
  board: Ember.inject.service(),

  combinedIssues: function(){
    return this.get("board.combinedIssues");
  }.property("board.model.combinedIssues.@each.{order,columnIndex}")

})

export default HbArrayObserverComponent;
