'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var ModalRegion = Backbone.Marionette.Region.extend({
	el: '.backdrop',
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
		this.$el.addClass('hide');
		this.empty(); // wrap this in an animation end or timeout
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