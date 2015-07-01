import Ember from "ember";

var ColumnComponent = Ember.Component.extend({
  board: Ember.inject.service(),
  sortable: Ember.inject.service(),

  classNames: ["column"],
  issues: function(){
    console.log("resorting");
    var column = this.get("column");
    var issues = this.get("board.combinedIssues");
    return issues.filter(function(i){
      return i.column.index === column.index;
    }).sort(function(a,b){
      return a._data.order - b._data.order;
    });
  }.property("board.combinedIssues"),
  reSortColumn: 0,
  appendToSortable: function(){
    this.get("sortable").append(this);
  }.on("didInsertElement")
});

export default ColumnComponent;
