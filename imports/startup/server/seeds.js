import { Meteor } from 'meteor/meteor';

import { Bookings } from '../../api/bookings/bookings.js';
import { Customers } from '../../api/customers/customers.js';

Meteor.startup(() => {
	// if DB is empty at startup create some sample data
	if (Bookings.find().count() === 0) {

		const data = [
			{
				code: "ACPR-068-01",
				title: "Servicio de Soporte ERP_SAP",
				value: 118440000,
				currency: "COP",
				brm: "JOIV",
				statusDate: "2017-01-31",
			},
			{
				code: "AMPT-015-01",
				title: "Consultoria APRISO",
				value: 196800000,
				currency: "COP",
				brm: "MVVE",
				statusDate: "2017-02-28",
			},
			{
				code: "ACPR-069-01",
				title: "Implementación Pricing",
				value: 150000000,
				currency: "COP",
				brm: "DACS",
				statusDate: "2017-03-15",
			},
		];

		data.forEach((booking) => {
			booking.customerCode = booking.code.substr(0, 4);
			booking.bookingConsecutive = booking.code.substr(5, 3);
			booking.bookedMonth = Number(booking.statusDate.substr(5, 2));
			booking.bookedYear = Number(booking.statusDate.substr(0, 4));
			Bookings.insert(booking);
		});
	}

	if (Customers.find().count() === 0) {
		const data = [
			{
				code: "ACPR",
				name: "Acerías Paz del Río",
				industry: "Siderurgia / Metalurgia",
				customerSince: "2008",
			},
			{
				code: "YARC",
				name: "Yara Colombia",
				industry: "Agronegocios",
				customerSince: "2014",
			},
		];

		data.forEach((customer) => {
			Customers.insert(customer);
		});
	}
});
