import Ember from "ember";
import Issue from "../models/issue";

var HbSimulatorComponent = Ember.Component.extend({
  classNames: ["simulator"],
  board: Ember.inject.service(),

  issue1: function(){
    return this.get("board.repos.firstObject.issues.firstObject");
  }.property("board.repos.firstObject.issues.firstObject"),
  //column2: function(){
  //  return this.get("sortable.columns")[1];
  //}.property("sortable.columns.@each"),
  //column3: function(){
  //  return this.get("sortable.columns")[2];
  //}.property("sortable.columns.@each"),

  actions: {
    addNewToColumn1: function(title){
      var self = this;
      var column = this.get("column1");
      var issue = Issue.create({
        title: title,
        _data: {order: 0.545},
        column: self.get("column1.column")
      });
      console.log("Not working anymore");
    },
    addNewToColumn2: function(title){
      var self = this;
      var column = this.get("column2");
      var issue = Issue.create({
        title: title,
        _data: {order: 2.535},
        column: self.get("column2.column")
      });
      console.log("Not working anymore");
    },
    addNewToColumn3: function(title){
      var self = this;
      var column = this.get("column3");
      var issue = Issue.create({
        title: title,
        _data: {order: 4.22},
        column: self.get("column3.column")
      });
      console.log("Not working anymore");
    },
    changeIssueOrder: function(){
      var self = this;
      var issue = this.get("issue1");
      issue.set("_data.order", 4);
    }
  }
})

export default HbSimulatorComponent;
