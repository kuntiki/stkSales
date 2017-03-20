import { Meteor } from 'meteor/meteor';

import { Bookings } from '../bookings.js';

Meteor.publish('bookings', function() {
    return Bookings.find({}, {sort: {code: 1}});
});

Meteor.publish('bookings.inMonth', function(params) {
	console.log(params);
	return Bookings.find({bookedMonth: params.month, bookedYear: params.year});
});