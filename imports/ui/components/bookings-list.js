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
		var stats = Bookings.find({}).fetch().reduce((runningTotals, opp) => {
			// Values in local currency
			runningTotals.totalValueLC = runningTotals.totalValueLC ? runningTotals.totalValueLC + opp.value : opp.value;
			// totalServicesLC: runningTotals.totalServicesLC + 0;
			// totalProductLC: 0,
			// totalLaborLC: 0,
			// totalProductCostLC: 0,
			// // Values in USD
			// totalValueUSD: 0,
			// totalServicesUSD: 0,
			// totalProductUSD: 0,
			// totalLaborUSD: 0,
			// totalProductCostUSD: 0,
			// // Operations
			runningTotals.totalHours = runningTotals.totalHours ? runningTotals.totalHours + opp.adjHours : opp.adjHours;
			// servicesGMPerc: 0,
			// productGMPerc: 0,
			return runningTotals;
		}, {});
		console.log(stats);
		return stats;
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

Template.bookings_view.events({
	'submit form.view-booking': function(event, template) {
		event.preventDefault();
		var bookingId = FlowRouter.getParam("id");
		// Adjusted properties
        var adjHours = template.$('input[name=adjHours]').val();
        var adjBrm = template.$('input[name=adjBrm]').val();
        Bookings.update(bookingId, 
        	{ 
        		$set: { 
        				adjHours: adjHours,
        				adjBrm: adjBrm, 
        			} 
        	});
	        FlowRouter.go('/bookings');
	},
});
