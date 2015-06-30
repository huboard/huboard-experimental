import Ember from "ember";
import Board from "../models/board";
import FixtureData from "../fixtures/fixture_data";

var BoardRoute = Ember.Route.extend({
  board: Ember.inject.service(),

  model: function(){ 
    var board = Board.create({
      repos: FixtureData.repos,
      columns: FixtureData.columns
    });
    this.set("board.model", board);
    return board;
  }

});

export default BoardRoute;
