/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/underscore/underscore.js');
app.import('bower_components/jquery-ui/jquery-ui.js');

module.exports = app.toTree();
