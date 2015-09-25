import Ember from "ember";

var CardOrderMixin = Ember.Mixin.create({
  calculateOrder: function(ev, ui, element, elements, registry){
    var findViewData = function (element){
      return registry[$(element).attr("id")]
        .get("controller");
    };

    var index = elements.index(ui.item);

    var first = index === 0,
    last = index === elements.size() - 1,
    currentElement = $(ui.item),
    currentData = findViewData(currentElement),
    beforeElement = elements.get(index ? index - 1 : index),
    beforeIndex = elements.index(beforeElement),
    beforeData = findViewData(beforeElement),
    afterElement = elements.get(elements.size() - 1 > index ? index + 1 : index),
    afterIndex = elements.index(afterElement),
    afterData = findViewData(afterElement),
    current = currentData.get("issue.order"),
    before = beforeData.get("issue.order"),
    after = afterData.get("issue.order");

    if(first && last) {
      return current;
    }

    if(first) {
      return (after || 1)/2;

      } else if (last) {
      // dragged to the bottom
      return (before + 1);

      }  else {
        return (((after + before) || 1)/2);
      }
    }

  })

  export default CardOrderMixin;
