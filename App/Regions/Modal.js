'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var ModalRegion = Backbone.Marionette.Region.extend({
	el: '.modal', // maybe i should add an extra div so the div is clickable by the item view
	constructor: function() {
		_.bindAll(this, 'getEl', 'showModal', 'hideModal');
		Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
		this.on('show', this.showModal, this);
	},
	showModal: function(view) {
		this.keyCheck();
		view.on('close', this.hideModal, this);
		this.$el.removeClass('hide');
	},
	hideModal: function() {
		var transitions = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
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
	}
});

module.exports = ModalRegion;