import Ember from "ember";

var CardMoveMixin = Ember.Mixin.create({
  cardMover: Ember.Object.create({
    handleCardMove: function(){
      var column = this.data.column;
      var issue = this.data.card.get("issue");
      var order = this.data.order;
      issue.set("_data.order", order);
      issue.set("column", column.get("column"));
    },
    calculateIssueOrder: function(issue_above, issue_below){
      var issue = this.data.card.get("issue");
      if(!issue_above && !issue_below){return issue.get("order"); }
      if(!issue_above){ return this.moveToTop(issue, issue_below); }
      console.log(`Issue Above Order: ${issue_above.title}`);
      if(!issue_below){ return this.moveToBottom(issue, issue_above); }
      console.log(`Issue Below Order: ${issue_below.title}`);
      return this.move(issue, issue_above, issue_below);
    },
    move: function(issue, issue_above, issue_below, column){
      var above_order = issue_above._data.order;
      var below_order = issue_below._data.order;
      return (above_order + below_order) / 2;
    },
    moveToTop: function(issue, issue_below, column){
      return (issue_below._data.order) / 2;
    },
    moveToBottom: function(issue, issue_above, column){
      return issue_above._data.order + 1;
    },
    findCard: function(element, column){
      return column.get("cards").find(function(card){
        return card.$().is(element);
      });
    },
    findColumn: function(element, columns){
      return columns.find(function(column){
        return column.$().is($(element).closest(".column"));
      });
    },
    issueAbove: function(index, issues, mod){
      if(index + mod && issues.length){
        return issues.objectAt((index + mod) - 1);
      }
      return null;
    },
    issueBelow: function(index, issues, mod){
      if(!(index + mod) && issues.length){
        return issues.objectAt(0);
      } else if((index + mod) !== (issues.length - 1)){
        return issues.objectAt(index + mod);
      } else if(index !== (issues.length - 1) && mod){
        return issues.objectAt(index + mod);
      } else if((index + mod) === issues.length - 1){
        return issues.get("lastObject");
      }
      return null;
    },
    indexModifier: function(index, column_changed){
      //Adjust based on issue dragging up or down
      if(column_changed){ return 0; }
      return index >= this.data.originIndex ? 1 : 0;
    }
  })
});

export default CardMoveMixin;
