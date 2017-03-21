import { Meteor } from 'meteor/meteor';

import { Bookings } from '../bookings.js';

Meteor.publish('bookings', function() {
    return Bookings.find({}, {sort: {code: 1}});
});

Meteor.publish('bookings.inMonth', function(params) {
	return Bookings.find({bookedMonth: params.month, bookedYear: params.year});
});

Meteor.publish('singleBooking', function(params) {
	var bookingId = params;
	return Bookings.find({_id: bookingId});
});