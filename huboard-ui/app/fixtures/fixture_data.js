import Ember from "ember";
import Repo from "../models/repo";
import Issue from "../models/issue";
import Column from "../models/column";

var ColumnOne = Column.create({
    name: "Column 1",
    index: 0 
})
var ColumnTwo = Column.create({
    name: "Column 2",
    index: 1 
})
var ColumnThree = Column.create({
    name: "Column 3",
    index: 2 
})


var FixtureData = Ember.Object.create({
  columns: [
    ColumnOne,
    ColumnTwo,
    ColumnThree
  ],
  repos: [
    Repo.create({
      name: "Board 1",
      issues: [
        Issue.create({
          title: "Issue 1",
          _data: {order: 0},
          column: ColumnOne
        }),
        Issue.create({
          title: "Issue 2",
          _data: {order: 1},
          column: ColumnOne
        }),
        Issue.create({
          title: "Issue 3",
          _data: {order: 2},
          column: ColumnOne
        })
      ]
    }),
    Repo.create({
      name: "Board 2",
      issues: [
        Issue.create({
          title: "Issue 4",
          _data: {order: 0},
          column: ColumnTwo
        }),
        Issue.create({
          title: "Issue 5",
          _data: {order: 1},
          column: ColumnTwo
        }),
        Issue.create({
          title: "Issue 6",
          _data: {order: 2},
          column: ColumnTwo
        })
      ]
    }),
    Repo.create({
      name: "Board 3",
      issues: [
        Issue.create({
          title: "Issue 7",
          _data: {order: 0},
          column: ColumnThree
        }),
        Issue.create({
          title: "Issue 8",
          _data: {order: 1},
          column: ColumnThree
        }),
        Issue.create({
          title: "Issue 9",
          _data: {order: 2},
          column: ColumnThree
        })
      ]
    }),
  ]
});

export default FixtureData;
