'use strict';
/*global CodeMirror, xmlToJSON */

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
		var layerPartName = [];
		var layerIds = [];
		var widgetLayers = [];

		self.addBindings();
		myCodeMirror.save();

		var recipe = $('#recipe').val();

		recipe = xmlToJSON.parseString($('#recipe').val(), {
			stripAttrPrefix: false,
			attrKey: 'attr',
			childrenAsArray: false
		}).Orchard.Data;

		$('button').text($('button').data('success'));

		var layerCollection = recipe.Layer;

		_.map(layerCollection, function(currentLayer) {
			layerNames.push('/Layer.LayerName=' + currentLayer.LayerPart.attr.Name._value);
			layerIds.push(currentLayer.attr.Id._value);
		});

		_.map(recipe, function(widget) {
			if (_.isArray(widget)) {
				_.each(widget, function(test) {
					if (test.CommonPart && test.CommonPart.attr && test.CommonPart.attr.Container) {
						widgetLayers.push(test.CommonPart.attr.Container._value);
					}
				});
			} else if (_.isObject(widget)) {
				_.each(widget, function(test) {
					if (test.attr && test.attr.Container) {
						widgetLayers.push(test.attr.Container._value);
					}
				});
			}
		});

		_.each(layerNames, function(test) {
			layerPartName.push(test.split('=')[1]);
		});

		var layerWidgetDiff = _.difference(widgetLayers, layerNames);
		var layerIdNameDiff = _.difference(layerIds, layerPartName);
		if (!layerWidgetDiff.length || !layerIdNameDiff.length) {
			self.noDifferences();
		} else {
			self.showDifferences(layerWidgetDiff, layerIdNameDiff);
		}

	});


	this.addBindings = function() {
		$(document).trigger('modalOpen');

		$(document).on('modalOpen', function() {
			$(this).on('keydown', function(e) {
				if (e.keyCode === 27) {
					$('.backdrop').addClass('hide');
				}
			});

			$(this).on('click', '.close', function() {
				$('.backdrop').addClass('hide');
			});
		});
	};

	this.showDifferences = function(differentLayers, nameId) {
		$('.layer-container').empty();
		var $layerTemplate = _.template($('#layerTemplate').html());
		var layerTemplate = '';
var testdata;
		console.log(nameId)

		var layerNameless = function() {
			_.each(nameId, function(test) {
				return test.split('=')[1]
			});
		};

			_.each(nameId, function(test, tee) {
console.log(tee)
				return test;
			});


		$(document).trigger('modalOpen');
		$('.backdrop').removeClass('hide'); // lol what am i doing
		_.each(differentLayers, function(layerID, iterate) {
			// layerTemplate = $layerTemplate({
			// 	layerName: layerID,
			// 	layerTest: tests()
			// });

			testdata = {
				layerName: layerID,
				layerTest: nameId[iterate].split('=')[1]
			}
			$('.layer-container').append($layerTemplate(testdata));
			// This code is gross, its functional now ill move to marionette
			// Todo - Add curretnt date in orchard format to modified etc... so that if the user copies and pastes
			// it actually works :-)
		});

		// _.each(nameId, function(layerMismatch) {
		// 	layerTemplate = $layerTemplate({
		// 		layerName: layerMismatch.split('=')[1]
		// 	});
		// 	$('.layer-container').append(layerTemplate);
		// });
	};

	this.noDifferences = function() {
	};

	myCodeMirror.on('change', function() {
		// Reset button text
		$('button').text('Save');
	});
});