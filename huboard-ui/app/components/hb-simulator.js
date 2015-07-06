import Ember from "ember";
import Issue from "../models/issue";

var HbSimulatorComponent = Ember.Component.extend({
  classNames: ["simulator"],
  board: Ember.inject.service(),
  sortable: Ember.inject.service(),

  column1: function(){
    return this.get("sortable.columns")[0];
  }.property("sortable.columns.@each"),
  column2: function(){
    return this.get("sortable.columns")[1];
  }.property("sortable.columns.@each"),
  column3: function(){
    return this.get("sortable.columns")[2];
  }.property("sortable.columns.@each"),

  actions: {
    addNewToColumn1: function(title){
      var self = this;
      var column = this.get("column1");
      var issue = Issue.create({
        title: title,
        _data: {order: 0.545},
        column: self.get("column1.column")
      });
      column.addNewIssue(issue);
    },
    addNewToColumn2: function(title){
      var self = this;
      var column = this.get("column2");
      var issue = Issue.create({
        title: title,
        _data: {order: 2.535},
        column: self.get("column2.column")
      });
      column.addNewIssue(issue);
    },
    addNewToColumn3: function(title){
      var self = this;
      var column = this.get("column3");
      var issue = Issue.create({
        title: title,
        _data: {order: 4.22},
        column: self.get("column3.column")
      });
      column.addNewIssue(issue);
    }
  }
})

export default HbSimulatorComponent;
