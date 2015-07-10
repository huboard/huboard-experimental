import Ember from "ember";

var BoardController = Ember.Controller.extend({
  columns: Ember.A(),
  actions: {
    registerColumn: function(column){
      this.get("columns").pushObject(column);
    }
  }
});

export default BoardController;
