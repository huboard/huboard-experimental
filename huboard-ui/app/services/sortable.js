import Ember from "ember";

var SortableService = Ember.Service.extend({
  board: Ember.inject.service(),
  columns: [],

  append: function(column){
    var self = this;
    column.$(".cards").sortable({
      items: "li.card",
      placeholder: "ui-sortable-placeholder",
      connectWith: "ul.cards",
      start: function(ev, ui){
        self.cardMoveData = {};
        self.cardMoveData.originIndex = ui.item.index();

        var column = self.findColumn(ui);
        self.cardMoveData.originColumn = column;

        var card = self.findIssue(ui);
        self.cardMoveData.card = card;
      },
      update: function(ev, ui){
        if (this !== ui.item.parent()[0]){return ;}

        var column = self.findColumn(ui);
        self.cardMoveData.targetColumn = column;

        var index = ui.item.index();
        var mod = self.indexModifier(index, self.columnChanged());

        var issues = column.get("cards");
        var issue_above = self.issueAbove(index, issues, mod);
        var issue_below = self.issueBelow(index, issues, mod);

        var order = self.calculateCardMove(issue_above, issue_below);
        self.cardMoveData.order = order;
      },
      stop: function(ev, ui){
        $(this).sortable("cancel");
        $(ui.sender).sortable("cancel");
        Ember.run.once(function(){
          self.handleCardMove();
        });
      },
    });
  },
  handleCardMove: function(){
    var column = this.cardMoveData.targetColumn;
    var issue = this.cardMoveData.card.get("issue");
    var order = this.cardMoveData.order;
    issue.set("_data.order", order);
    if(this.columnChanged()){
      issue.set("column", column.get("column"));
    }
  },
  calculateCardMove: function(issue_above, issue_below){
    var issue = this.cardMoveData.card.get("issue");
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
  columnChanged: function(){
    var originColumn = this.cardMoveData.originColumn;
    var targetColumn = this.cardMoveData.targetColumn;
    return !originColumn.$().is(targetColumn.$());
  },
  indexModifier: function(index, column_changed){
    //Adjust based on issue dragging up or down
    if(column_changed){ return 0; }
    return index >= this.cardMoveData.originIndex ? 1 : 0;
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
