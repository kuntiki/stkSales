import { Meteor } from 'meteor/meteor';

import { Bookings } from '../../api/bookings/bookings.js';

Meteor.startup(() => {
	// if DB is empty at startup create some sample data
	console.log(Bookings.find().count());
	if (Bookings.find().count() === 0) {

		const data = [
			{
				code: "ACPR-068-01",
				title: "Servicio de Soporte ERP_SAP",
				value: "118440000",
				currency: "COP",
				brm: "JOIV",
			},
			{
				code: "AMPT-015-01",
				title: "Consultoria APRISO",
				value: "196800000",
				currency: "COP",
				brm: "MVVE",
			},
		];

		data.forEach((booking) => {
			Bookings.insert(booking);
		});

		console.log(Bookings.find().fetch());
	}
});
