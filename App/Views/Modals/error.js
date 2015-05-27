'use strict';

var $ = require('jquery'),
	Backbone = require('backbone'),
	_ = require('underscore');
var App = require('../../App.js');
var showErrors = require('./showErrors.js');
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
		},
		'click button': 'advanceStep'
	},
	template: function(data) {
		console.log(data.error)
		return errorsTemplate({error: data.error});
	},
	templateHelpers: function() {
		return {
			error: this.options.data
		};
	},
	onRender: function() {
		console.log(this.options.data);
	},
	advanceStep: function() {
		var transitions = 'transitionend webkitTransitionEnd';
		var self = this;

		this.$el.addClass('slide-out').off(transitions).on(transitions, function() {
			$(this).off(transitions);
			App.modal.show(new showErrors({data: self.options.data}));
			console.log('ho')
		});
	}
});

module.exports = errorModal;