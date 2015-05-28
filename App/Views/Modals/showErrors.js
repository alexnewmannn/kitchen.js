'use strict';

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');
var errorsTemplate = require('../../Templates/showErrors.hbs');

var errorModal = Backbone.Marionette.ItemView.extend({
	className: 'backdrop',
	triggers: {
		'click .close': 'close',
		'click': 'close',
		'click button': 'test'
	},
	events: {
		'click .results': function(e) {
			e.stopPropagation();
		}
	},
	template: function(data) {
		return errorsTemplate({error: data.error});
	},
	templateHelpers: function() {
		return {
			error: this.options.data
		};
	},
	onRender: function() {
		console.log(this.options.data);
	}
});

module.exports = errorModal;