'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var ModalRegion = Backbone.Marionette.Region.extend({
	el: '.modal',
	constructor: function() {
		_.bindAll(this, 'getEl', 'showModal', 'hideModal');
		Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
		this.on('show', this.showModal, this);
	},
	showModal: function(view) {
		this.keyCheck();
		this.$el.removeClass('hide');
		view.on('close', this.hideModal, this);
		view.on('test', this.test, this);
	},
	hideModal: function() {
		var transitions = 'transitionend webkitTransitionEnd';
		var self = this;

		this.$el.addClass('hide').off(transitions).on(transitions, function() {
			$(this).off(transitions);
			self.empty();
		});
	},
	keyCheck: function() {
		var self = this;

		$(document).on('keydown', function(e) {
			if (e.keyCode === 27) {
				self.hideModal();
			}
		});
	},
	test: function(view) {
		view.$el.addClass('slide-out');
		this.empty();

	},
	onBeforeSwap: function(view) {
		view.$el.addClass('slide-in');
	}
});

module.exports = ModalRegion;