'use strict';

var $ = require('jquery'),
	_ = require('underscore');

$(function() {
	$('button').on('click', function() {
		myCodeMirror.save();

		var recipe = $('#recipe').val();
		recipe = xmlToJSON.parseString(recipe, {
			childrenAsArray: false
		});

		$('button').text($('button').data('success'))


		console.log(recipe.Orchard.Recipe)
	});

	myCodeMirror.on('change', function() {
		// Reset button text
		$('button').text('Save');
	});
});