import Ember from "ember";
import Issue from "../models/issue";

var HbSimulatorComponent = Ember.Component.extend({
  classNames: ["simulator"],
  board: Ember.inject.service(),

  issue1: function(){
    return this.get("board.repos.firstObject.issues.firstObject");
  }.property("board.repos.firstObject.issues.firstObject"),
  issues: function(){
    return this.get("board.combinedIssues");
  }.property("board.combinedIssues.@each"),

  column1: function(){
    return this.get("board.columns.firstObject");
  }.property("board.columns"),
  column2: function(){
    return this.get("board.columns")[1];
  }.property("board.columns"),
  column3: function(){
    return this.get("board.columns")[2];
  }.property("board.columns"),

  actions: {
    addNewToColumn1: function(title){
      var self = this;
      var issue = Issue.create({
        title: title,
        _data: {order: 0.545},
        column: self.get("column1")
      });
      this.get("issues").pushObject(issue);
    },
    addNewToColumn2: function(title){
      var self = this;
      var issue = Issue.create({
        title: title,
        _data: {order: 2.535},
        column: self.get("column2")
      });
      this.get("issues").pushObject(issue);
    },
    addNewToColumn3: function(title){
      var self = this;
      var issue = Issue.create({
        title: title,
        _data: {order: 4.22},
        column: self.get("column3")
      });
      this.get("issues").pushObject(issue);
    },
    changeIssueOrder: function(){
      var self = this;
      var issue = this.get("issue1");
      issue.set("_data.order", 4);
    },

    addHundredsOfCards: function(){
      var self = this;
      Ember.run.once(function(){
        self.get("board.columns").forEach(function(column){
          var index = column.index;
          for(var i=0;i < 100;i++){
            var issue = Issue.create({
              title: `Col${index} ${i}`,
              _data: {order: (4 + i)},
              column: column
            });
            self.get("issues").pushObject(issue);
          }
        });
      });
    }
  }
})

export default HbSimulatorComponent;
