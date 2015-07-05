import Ember from "ember";

var HbCardComponent = Ember.Component.extend({
  sortable: Ember.inject.service(),
  tagName: "li",
  classNames: ["card", "ui-sortable-handle"],

  addToSortable: function(){
    console.log(this.element);
    this.get("sortable").addCard(this);
  }.on("didInsertElement"),
  removeFromSortable: function(){
    this.get("sortable").removeCard(this);
  }.on("willDestroyElement")
});

export default HbCardComponent;
