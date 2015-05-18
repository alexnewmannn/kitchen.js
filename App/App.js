'use strict';

var $ = require('jquery'),
	_ = require('underscore');

$(function() {
	$('button').on('click', function() {
		myCodeMirror.save();

		var recipe = $('#recipe').val();
		recipe = xmlToJSON.parseString(recipe, {
			childrenAsArray: false
		}).Orchard.Recipe;


		console.log(recipe)
	});
});