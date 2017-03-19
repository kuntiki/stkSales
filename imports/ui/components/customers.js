import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Customers } from '../../api/customers/customers.js';

import './customers.html';

Template.customers.onCreated(function customersOnCreated() {
	this.autorun(() => {
		this.subscribe('customers');
	});
});

// Lista de clientes
Template.customers.helpers({
	customers: function() {
		return Customers.find();
	}
})

//  Nuevo cliente
Template.customers_create.events({
	'submit form.create-customer': function(event, template) {
        event.preventDefault();
        var customerCode = template.$('input[name=code]').val();
        var customerName = template.$('input[name=name]').val();
        if (customerName.length && customerCode.length === 4) {
            Customers.insert( { code: customerCode, name: customerName } );
	        FlowRouter.go('/customers');
        }
	},
});

// Editar cliente
Template.customers_edit.onCreated(function customersEditOnCreated() {
	this.autorun(() => {
		customerId = FlowRouter.getParam("id");
		this.subscribe('singleCustomer', customerId);
	});
});

Template.customers_edit.helpers({
	customer: function() {
		var customerId = FlowRouter.getParam("id");
		var customer = Customers.findOne({_id: customerId});
		return customer;
	},
});

Template.customers_edit.events({
	'click a.delete': function() {
		event.preventDefault();
		Customers.remove(customerId);
		FlowRouter.go('/customers');
	},
});