import Ember from "ember";

var HbCardComponent = Ember.Component.extend({
  tagName: "li",
  classNames: ["card", "ui-sortable-handle"],

  registerToParent: function(){
    this.get("parentView.cards").pushObject(this);
  }.on("didInsertElement"),
  unregisterFromParent: function(){
    this.get("parentView.cards").removeObject(this);
  }.on("willDestroyElement")
});

export default HbCardComponent;
