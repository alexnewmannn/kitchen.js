'use strict';

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');
var successTemplate = require('../../Templates/success.hbs');

var successModal = Backbone.Marionette.ItemView.extend({
	className: 'backdrop',
	triggers: {
		'click .close': 'close',
		'click': 'close'
	},
	events: {
		'click .results': function(e) {
			e.stopPropagation();
		}
	},
	template:function() {
		return successTemplate();
	}
});

module.exports = successModal;