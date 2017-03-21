import { Template } from 'meteor/templating';

import { Bookings } from '../../api/bookings/bookings.js';

import './bookings-list.html';

Template.bookings_list.onCreated(function bookingsListOnCreated() {
	var now = new Date();
	this.monthYear = new ReactiveVar;
	this.monthYear.set({ month: now.getMonth()+1, year: now.getFullYear() });
	this.autorun(() => {
		this.subscribe('bookings.inMonth', this.monthYear.get());
	});
});

Template.bookings_list.helpers({
	bookings: function() {
		return Bookings.find();
	},
	thisMonth: function() {
		console.log(Template.instance());
		var monthYear = Template.instance().monthYear.get();
		return monthYear.month;
	},
	thisYear: function() {
		var monthYear = Template.instance().monthYear.get();
		return monthYear.year;
	},
	statistics: function() {
		return {
			totalValueLC: total = Bookings.find({})
										.fetch().map(item => item.value).reduce((a, b) => a + b),
		};
	},
});

Template.bookings_list.events({
	'change select.month-select': function (event, template) {
		event.preventDefault();
		var monthYear = { month: Number($(event.target).val()), year: 2017 };
		template.monthYear.set(monthYear);
	}
});

// Ajustar venta
Template.bookings_view.onCreated(function bookingsViewOnCreated() {
	this.autorun(() => {
		var bookingId = FlowRouter.getParam("id");
		this.subscribe('singleBooking', bookingId);
	});
});

Template.bookings_view.helpers({
	booking: function() {
		var bookingId = FlowRouter.getParam("id");
		var booking = Bookings.findOne({_id: bookingId});
		return booking;
	},
});

