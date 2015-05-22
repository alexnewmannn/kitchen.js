'use strict';

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');

var fixTemplate = require('../Templates/recipeFixTemplate.hbs');
var Modal = require('../Regions/Modal.js');
var App = require('../App.js');
var Success = require('./success.js');
var Errors = require('./error.js');

var myCodeMirror;
var recipe;
var layerCollection;

var recipeFix = Backbone.Marionette.ItemView.extend({
	el: '.recipe-form',
	tagName: 'form',
	events: {
		'click #parseRecipe': 'parseRecipe'
	},
	template:function(data) {
		var compiledTemplate = fixTemplate();
		return compiledTemplate;
	},
	onRender: function() {
		myCodeMirror = CodeMirror.fromTextArea(document.getElementById('recipe'), {
			theme: 'tomorrow-night-eighties',
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true,
			scrollbarStyle: 'overlay'
		});
	},
	parseRecipe: function() {
		myCodeMirror.save();
		recipe = xmlToJSON.parseString($('#recipe').val(), {
			childrenAsArray: false
		}).Orchard.Data;

		$('button').text($('button').data('success'));

		this.duplicateLayer();
	},

	/*
	 * Here we take each layer and widget and compare
	 * the widget's layer and check if the layer exists
	*/
	widgetLayerComparison: function() {
		var layerNames = [];
		var widgetLayers = [];
		layerCollection = recipe.Layer;

		_.map(layerCollection, function(currentLayer) {
			layerNames.push('/Layer.LayerName=' + currentLayer.LayerPart._attr.Name._value);
		});

		_.map(recipe, function(widget) {
			if (_.isArray(widget)) {
				_.each(widget, function(test) {
					if (test.CommonPart && test.CommonPart._attr && test.CommonPart._attr.Container) {
						widgetLayers.push(test.CommonPart._attr.Container._value);
					}
				});
			} else if (_.isObject(widget)) {
				_.each(widget, function(test) {
					if (test._attr && test._attr.Container) {
						widgetLayers.push(test._attr.Container._value);
					}
				});
			}
		});

		var difference = _.difference(widgetLayers, layerNames);
		console.log(difference);
	},

	/*
	 * Here we take each layer and compare each layer's
	 * ID and Name and make sure they create a match
	*/
	layerIdNameComparison: function() {
		var layerId = [];
		var layerName = [];

		_.each(recipe.Layer, function(currentLayer) {
			layerId.push(currentLayer._attr.Id._value.split('=')[1]);
			layerName.push(currentLayer.LayerPart._attr.Name._value);
		});

		var difference = _.difference(layerId, layerName);
		console.log(difference);
	},

	duplicateLayer: function() {
		var layers = [];
		var duplicateLayers = [];

		_.each(recipe.Layer, function(currentLayer) {
			layers.push(currentLayer.LayerPart._attr.Name._value);
		});

		for (var i = 0; i < layers.length - 1; i++) {
			if (layers[i + 1] === layers[i]) {
				duplicateLayers.push(layers[i]);
			}
		}

		if (!duplicateLayers.length) {
			App.modal.show(new Success());
		} else {
			App.modal.show(new Errors());
		}
	}
});

module.exports = recipeFix;