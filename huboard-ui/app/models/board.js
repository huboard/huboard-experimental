import Ember from "ember";

var Board = Ember.Object.extend({
  combinedIssues: function(){
    var issues = this.get("repos").map(function(repo){
      return repo.issues;
    });
    return _.flatten(issues);
  }.property("repos.issues.@each", "repos.issues.@each.column.index")
});

export default Board;
