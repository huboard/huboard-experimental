import Ember from "ember";

var Board = Ember.Object.extend({
  wireUpRepoObservers: function(){
    var self = this;
    this.get("repos").forEach(function(repo){
      repo.addObserver("issues.length", self, "recombine");
    });
  }.on("init"),
  recombine: function(){
    this.incrementProperty("combine");
  },
  combine: 0,

  combinedIssues: function(){
    var issues = this.get("repos").map(function(repo){
      return repo.issues;
    });
    return _.flatten(issues);
  }.property("repos.@each.issues", "combine")
});

export default Board;
