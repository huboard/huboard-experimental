import Ember from "ember";

var BoardService = Ember.Service.extend({
  model: {},
  setUnknownProperty: function(key, value){
    return this.set(`model.${key}`, value);
  },
  unknownProperty: function(key){
    return this.get(`model.${key}`);
  },

  //This is all probably its own service?
  initIssueDragAndDrop: function(){
    Ember.$(".cards").sortable({
      items: "li.card",
      connectWith: "ul.cards",
      update: function(ev, ui){
        if (this !== ui.item.parent()[0]){return ;}
        console.log("Moved!");
      }
    });
  }

});

export default BoardService;
