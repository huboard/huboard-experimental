import Ember from "ember";
import CardMoveMixin from "../mixins/card-move";

var SortableMixin = Ember.Mixin.create(CardMoveMixin, {
  attachSortable: function(cardMove){
    var cardMove = this.cardMover;
    var columns = this.get("columns");
    self.$(".cards").sortable({
      helper: function(ev,ui) {
        cardMove.data = {};
        cardMove.data.originIndex = ui.index();

        var column = cardMove.findColumn(ui, columns);
        var card = cardMove.findCard(ui, column);
        cardMove.data.card = card;

        cardMove.data.clone = ui.clone().insertAfter(ui).hide();
        return ui.clone();
      },
      items: "li.card",
      placeholder: "ui-sortable-placeholder",
      connectWith: "ul.cards",
      update: function(ev, ui){
        if (this !== ui.item.parent()[0]){return ;}
        var column = cardMove.findColumn(ui.item, columns);
        cardMove.data.column = column;

        var index = ui.item.index();
        var column_changed = ui.sender;
        var mod = cardMove.indexModifier(index, column_changed);

        var issues = column.get("issues");
        var issue_above = cardMove.issueAbove(index, issues, mod);
        var issue_below = cardMove.issueBelow(index, issues, mod);

        var issue_order = cardMove.calculateIssueOrder(issue_above, issue_below);

        //$(this).sortable("cancel");
        //$(ui.sender).sortable("cancel");

        var issue = cardMove.data.card.get("issue");
        column.moveIssue(issue, issue_order);
      },
    });
  }.on("didInsertElement"),
});

export default SortableMixin;
