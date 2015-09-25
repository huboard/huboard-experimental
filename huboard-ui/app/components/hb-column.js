import Ember from "ember";
import SortableMixin from "../mixins/sortable";
import CardOrderMixin from "../mixins/card-order";

Function.prototype.__log = function(message){
  var fn = this;
  return function(){
    console.log('before', message, arguments);
    var result = fn.apply(this,arguments);
    console.log('after', message, arguments);
    return result;
  }
}

var ColumnComponent = Ember.Component.extend(CardOrderMixin, {
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
  }.on("didInsertElement"), 
  attachSortable: function(){
    var column = this,
      list = this.$('.cards');
    this.$('.cards').sortable({
      placeholder: "ui-sortable-placeholder",
      connectWith: "ul.cards",
      update: function(ev, ui) {
        var elements = list.find("> li"),
          element = ui.item,
          index = elements.index(ui.item);

        if(index === -1) { return; }

        var registry = column.container.lookup('-view-registry:main');
        var order = column.calculateOrder(ev, ui, element, elements, registry);

        // here be dragons
        var registry = column.container.lookup('-view-registry:main');
        var component = registry[$(ui.item).attr('id')]

        column.moveIssue(component.get('issue'), order)

      }.__log('update')
    })

  }.on('didInsertElement')
});

export default ColumnComponent;
