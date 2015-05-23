'use strict';

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');
var errorsTemplate = require('../../Templates/error.hbs');

var errorModal = Backbone.Marionette.ItemView.extend({
	className: 'backdrop',
	events: {
		'click': 'close',
		'click .close': 'close'
	},
	template:function() {
		return errorsTemplate();
	},
	close: function() {
		this.trigger('close');
	}
});

module.exports = errorModal;