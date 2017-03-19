import { Mongo } from 'meteor/mongo';

export const Bookings = new Mongo.Collection('bookings');

// These are the fields included in a Booking
// _id: internal id
// code: intra code - XXXX-NNN-VV
// title: brief description
// practice: profit center
// 