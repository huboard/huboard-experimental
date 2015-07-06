import Ember from "ember";

var HbCardComponent = Ember.Component.extend({
  sortable: Ember.inject.service(),
  tagName: "li",
  classNames: ["card", "ui-sortable-handle"],

  moveToColumn: function(column){
    var issue = this.get("issue");
    var origin = this.get("sortable.columns").find(function(col){
      return col.get("column.index") === issue.get("column.index");
    });
    origin.get("sortedIssues").removeObject(issue);

    issue.set("column", column.get("column"));
    var issues = column.get("issues");
    var index = issues.lastIndexOf(issue);
    column.get("sortedIssues").insertAt(index, issue);

    var self = this;
    Ember.run.next(function(){
      self.destroy();
    });
  },

  addToSortable: function(){
    this.get("sortable").addCard(this);
  }.on("didInsertElement"),
  removeFromSortable: function(){
    this.get("sortable").removeCard(this);
  }.on("willDestroyElement")
});

export default HbCardComponent;
