import Ember from "ember";
import SortableMixin from "../mixins/sortable";

var ColumnComponent = Ember.Component.extend(SortableMixin, {
  board: Ember.inject.service(),
  classNames: ["column"],
  cards: Ember.A(),

  issues: function(){
    var column = this.get("column");
    var issues = this.get("board.combinedIssues");
    return issues.filter(function(i){
      return i.column.index === column.index;
    }).sort(this.sortStrategy);
  }.property("board.model.combinedIssues.@each.{columnIndex,order}"),

  moveIssue: function(issue, order){
    var self = this;
    this.get("issues").removeObject(issue);
    Ember.run.schedule("afterRender", self, function(){
      issue.set("column", self.get("column"));
      issue.set("_data.order", order);
    });
  },
  sortStrategy: function(a,b){
    return a._data.order - b._data.order;
  },
  register: function(){
    this.sendAction("registerColumn", this);
  }.on("didInsertElement")
});

export default ColumnComponent;
