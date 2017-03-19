import { Meteor } from 'meteor/meteor';

import { Customers } from '../customers.js';

Meteor.publish('customers', function(){
    return Customers.find({}, {sort: {name: 1}});
});

Meteor.publish('singleCustomer', function(params) {
	customerId = params; 
	return Customers.find({_id: customerId});
});