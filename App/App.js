'use strict';
/*global myCodeMirror, xmlToJSON */

var $ = require('jquery'),
	_ = require('underscore');

$(function() {
	var self = this;
	var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('recipe'), {
		theme: 'tomorrow-night-eighties',
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true,
		scrollbarStyle: 'overlay'
	});

	$('button').on('click', function() {
		var layerNames = [];
		var widgetLayers = [];

		self.addBindings();
		myCodeMirror.save();

		var recipe = $('#recipe').val();
		recipe = xmlToJSON.parseString(recipe, {
			childrenAsArray: false
		}).Orchard.Data;

		$('button').text($('button').data('success'))

		var layerCollection = recipe.Layer;

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

		var diff = _.difference(widgetLayers, layerNames);
		if (diff.length === 0) {
			self.noDifferences();
		} else {
			self.showDifferences(diff);
		}
	});


	this.addBindings = function() {
		$(document).trigger('modalOpen');

		$(document).on('modalOpen', function() {
			$(this).on('keypress', function(e) {
				if (e.keyCode === 27) {
					$('.backdrop').addClass('hide');
				}
			});

			$(this).on('click', '.close', function() {
				$('.backdrop').addClass('hide');
			});
		});
	};

	this.showDifferences = function(differentLayers) {
		$('.layer-container').empty();
		var $layerTemplate = _.template($('#layerTemplate').html());
		var layerTemplate = '';


		$(document).trigger('modalOpen');
		$('.backdrop').removeClass('hide'); // lol what am i doing
		_.each(differentLayers, function(layerID) {
			layerTemplate += $layerTemplate({
				layerName: layerID
			});
			$('.layer-container').append(layerTemplate);
			// This code is gross, its functional now ill move to marionette
			// Todo - Add curretnt date in orchard format to modified etc... so that if the user copies and pastes
			// it actually works :-)
		});
	};

	this.noDifferences = function() {
	};

	myCodeMirror.on('change', function() {
		// Reset button text
		$('button').text('Save');
	});
});