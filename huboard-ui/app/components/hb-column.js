import Ember from "ember";

var ColumnComponent = Ember.Component.extend({
  board: Ember.inject.service(),
  sortable: Ember.inject.service(),
  classNames: ["column"],

  initIssues: function(){
    this.set("sortedIssues", Ember.A());
    var self = this;
    this.get("issues").forEach(function(issue){
      self.get("sortedIssues").pushObject(issue);
    });
  }.on("init"),
  issues: function(){
    var column = this.get("column");
    var issues = this.get("board.combinedIssues");
    return issues.filter(function(i){
      return i.column.index === column.index;
    }).sort(this.sortStrategy);
  }.property("board.model.combinedIssues.@each.columnIndex"),

  appendToSortable: function(){
    this.get("sortable.columns").pushObject(this);
    this.get("sortable").append(this);
  }.on("didInsertElement"),

  reorderIssue: function(issue, order){
    issue.set("_data.order", order);
    var self = this;
    Ember.run.next(function(){
      var issues = self.get("sortedIssues").sort(self.sortStrategy);
      var index = issues.lastIndexOf(issue);
      self.get("sortedIssues").removeObject(issue);
      self.get("sortedIssues").insertAt(index, issue);
    });
  },
  addNewIssue: function(issue){
    var repo = this.get("board.model.repos.firstObject");
    repo.get("issues").pushObject(issue);

    var self = this;
    Ember.run.next(function(){
      var issues = self.get("issues");
      var index = issues.lastIndexOf(issue);
      self.get("sortedIssues").insertAt(index, issue);
    });
  },

  sortStrategy: function(a,b){
    return a._data.order - b._data.order;
  },
});

export default ColumnComponent;
