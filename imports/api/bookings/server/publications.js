import { Meteor } from 'meteor/meteor';

import { Bookings } from '../bookings.js';

Meteor.publish('bookings', function(){
    return Bookings.find({}, {sort: {code: 1}});
});