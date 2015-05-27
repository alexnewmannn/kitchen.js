'use strict';
/*global CodeMirror, xmlToJSON */

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');

var fixTemplate = require('../Templates/recipeFixTemplate.hbs');
var App = require('../App.js');
var Success = require('./Modals/success.js');
var Errors = require('./Modals/error.js');

var myCodeMirror;
var recipe;
var layerCollection;
var results = {};

var recipeFix = Backbone.Marionette.ItemView.extend({
	el: '.recipe-form',
	tagName: 'form',
	events: {
		'click #parseRecipe': 'parseRecipe'
	},
	template:function() {
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

		myCodeMirror.on('change', function() {
			$('button').text('Save');
		});
	},
	parseRecipe: function() {
		myCodeMirror.save();
		recipe = xmlToJSON.parseString($('#recipe').val(), {
			childrenAsArray: false
		}).Orchard.Data;

		$('button').text($('button').data('success'));

		this.widgetLayerComparison();
		this.layerIdNameComparison();
		this.duplicateLayer();
	},

	/*
	 * Here we take each layer and widget and compare
	 * the widget's layer and check if the layer exists
	*/
	widgetLayerComparison: function() {
		var widgetLayers = [];
		var layerNames = recipe.Layer;

		var returnLayer = function(layer) {
			return '/Layer.LayerName=' + layer.LayerPart._attr.Name._value;
		};

		layerNames = _.map(layerNames, returnLayer);

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

		console.log(widgetLayers);
		console.log(layerNames);


		var difference = _.difference(widgetLayers, layerNames);
		if (difference.length) {
			results.widgetLayer = {};
			results.widgetLayer.value = difference;
			results.widgetLayer.title = 'widget' + (results.widgetLayer.value.length > 1 ? 's' : '') + ' pointing to a layer that does not exist';
		}
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
		if (difference.length) {
			results.layerIdName = {};
			results.layerIdName.value = difference;
			results.layerIdName.title = 'mismatched layer name' + (results.layerIdName.value.length > 1 ? 's' : '') + ' and ID' + (results.layerIdName.value.length > 1 ? 's' : '');
		}
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

		if (duplicateLayers.length) {
			results.duplicateLayers = {};
			results.duplicateLayers.value = duplicateLayers;
			results.duplicateLayers.title = 'duplicate layer' + (results.duplicateLayers.value.length > 1 ? 's' : '');
		}

		if (!_.isEmpty(results)) {
			this.errorHandler();
		}
	},

	errorHandler: function() {
		console.log(results);
		App.modal.show(new Errors({data: results}));
	}
});

module.exports = recipeFix;