'use strict';

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');
var successTemplate = require('../../Templates/success.hbs');

var successModal = Backbone.Marionette.ItemView.extend({
	className: 'backdrop',
	events: {
		'click': 'close',
		'click .close': 'close'
	},
	template:function() {
		return successTemplate();
	},
	close: function() {
		this.trigger('close');
	}
});

module.exports = successModal;