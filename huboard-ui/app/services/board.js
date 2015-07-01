import Ember from "ember";

var BoardService = Ember.Service.extend({
  model: {},
  setUnknownProperty: function(key, value){
    return this.set(`model.${key}`, value);
  },
  unknownProperty: function(key){
    return this.get(`model.${key}`);
  },
});

export default BoardService;
