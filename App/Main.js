'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var _ = require('underscore');

var View = require('./Views/recipeFix.js')
var App = require('./App.js')

$(function() {
	var RecipeView = new View({}).render();
});