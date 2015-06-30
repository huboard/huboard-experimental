import Ember from "ember";

var ColumnComponent = Ember.Component.extend({
  board: Ember.inject.service(),
  classNames: ["column"],
  issues: function(){
    var column = this.get("column");
    var issues = this.get("board.combinedIssues");
    return issues.filter(function(i){
      return i.column.index === column.index;
    }).sort(function(a,b){
      return a._data.order > b._data.order;
    });
  }.property("board.combinedIssues"),
  initSortable: function(){
    this.get("board").initIssueDragAndDrop();
  }.on("didInsertElement")
});

export default ColumnComponent;
