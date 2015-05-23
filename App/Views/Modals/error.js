'use strict';

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');
var errorsTemplate = require('../../Templates/error.hbs');

var errorModal = Backbone.Marionette.ItemView.extend({
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
		return errorsTemplate();
	}
});

module.exports = errorModal;