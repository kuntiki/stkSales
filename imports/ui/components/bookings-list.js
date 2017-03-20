import { Template } from 'meteor/templating';

import { Bookings } from '../../api/bookings/bookings.js';

import './bookings-list.html';

Template.bookings_list.onCreated(function bookingsListOnCreated() {
	this.autorun(() => {
		var now = new Date();
		var monthYear = { month: now.getMonth()+1, year: now.getFullYear() };
		this.subscribe('bookings.inMonth', monthYear);
	});
});

Template.bookings_list.helpers({
	bookings: function() {
		console.log(Bookings.find().fetch());
		return Bookings.find();
	},
});