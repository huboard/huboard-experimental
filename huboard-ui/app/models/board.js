import Ember from "ember";

var Board = Ember.Object.extend({
  issues: Ember.computed.alias("repos.@each.issues"),
  combinedIssues: function(){
    var issues = this.get("repos").map(function(repo){
      return repo.issues;
    });
    return _.flatten(issues);
  }.property("issues")
});

export default Board;
