import Ember from "ember";

var SortableService = Ember.Service.extend({
  board: Ember.inject.service(),
  columns: [],

  append: function(column){
    var self = this;
    this.get("columns").pushObject(column);
    Ember.$(".cards").sortable({
      items: "li.card",
      connectWith: "ul.cards",
      start: function(ev, ui){
        var column = self.findColumn(ui);
        self.set("originColumn", column);

        var issue = self.findIssue(ui).get("issue");
        self.set("issueInFlight", issue);
      },
      update: function(ev, ui){
        if (this !== ui.item.parent()[0]){return ;}
        var column = self.findColumn(ui);
        var issues = column.get("issues");

        var issue = self.get("issueInFlight");
        var issue_above = self.issueAbove(ui.item, issues);
        var issue_below = self.issueBelow(ui.item, issues);

        if(self.columnChanged(column)){ issue.set("column", column.get("column"))}
        if(!issue_above){ return self.moveToTop(issue, issue_below); }
        if(!issue_below){ return self.moveToBottom(issue, issue_above); }

        var above_order = issue_above._data.order;
        var below_order = issue_below._data.order;
        var order = (above_order + below_order) / 2;
        issue.set("_data.order", order);
      }
    });
  },
  moveToTop: function(issue, issue_below){
    var order = issue_below._data.order / 2;
    issue.set("_data.order", order);
  },
  moveToBottom: function(issue, issue_above){
    var order = issue_above._data.order + 1;
    issue.set("_data.order", order);
  },
  findColumn: function(element){
    return this.get("columns").find(function(column){
      var column_element = Ember.$(element.item).closest(".column");
      return column.$().is(column_element);
    });
  },
  findIssue: function(element){
    return this.get("cards").find(function(card){
      return card.$().is(element.item);
    });
  },
  issueAbove: function(item, issues){
    if(item.index()){
      return issues.objectAt(item.index());
    }
    return null;
  },
  issueBelow: function(item, issues){
    if(item.index() !== (issues.length - 1)){
      return issues.objectAt(item.index() + 1);
    }
    return null;
  },
  columnChanged: function(column){
    return !this.get("originColumn").$().is(column.$());
  },

  cards: [],
  addCard: function(issue){
    this.get("cards").addObject(issue);
  },
  removeCard: function(issue){
    this.get("cards").removeObject(issue);
  }
});

export default SortableService;
