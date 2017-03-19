import { Template } from 'meteor/templating';

import { Bookings } from '../../api/bookings/bookings.js';

import './bookings-list.html';

Template.bookings_list.onCreated(function bookingsListOnCreated() {
	this.autorun(() => {
		this.subscribe('bookings');
	});
});

Template.bookings_list.helpers({
	bookings: function() {
		return Bookings.find();
	},
});