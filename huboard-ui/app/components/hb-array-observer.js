import Ember from "ember";

var HbArrayObserverComponent = Ember.Component.extend({
  classNames: ["array-observer"],
  board: Ember.inject.service(),
})

export default HbArrayObserverComponent;
