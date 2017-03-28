import { Template } from 'meteor/templating';
import Papa from 'papaparse';

import { Bookings } from '../../api/bookings/bookings.js';

import './uploads.html';

Template.uploads.onCreated( function uploadsOnCreated() {
	Template.instance().uploading = new ReactiveVar( false );

	this.autorun(() => {
		this.subscribe('Bookings');
	});
});

Template.uploads.helpers({
	uploading: function() {
		return Template.instance().uploading.get();
	},
});

Template.uploads.events({
	'change [name="uploadBookings"]': function(event, template) {
		// set message uploading
		template.uploading.set(true);
		// parse file
		Papa.parse(event.target.files[0], {
			header: true,
			complete(results, file) {
				console.log(results);
				// insert data
				for ( let i = 0; i < results.data.length; i++ ) {
					let item   = results.data[ i ],
					exists = Bookings.findOne( { code: item.Propuesta } );

					if ( !exists ) {
						var newBooking = {
							code: item.Propuesta,
							title: item.Titulo,
							value: +item["Valor Estimado"],
							currency: item.Moneda,
							brm: item["Promotor / BRM"],
							statusDate: item["Fecha Estatus"],
							hours: item["Esfuerzo (Horas)"],
							labor: +item["Costo Nómina"],
							practice: item["Práctica"],
							expenses: +item["Valor Gastos"],
						};
						newBooking.customerCode = newBooking.code.substr(0, 4);
						newBooking.bookingConsecutive = newBooking.code.substr(5, 3);
						newBooking.bookedMonth = Number(newBooking.statusDate.substr(3, 2));
						newBooking.bookedYear = Number(newBooking.statusDate.substr(6, 4));
						newBooking.adjHours = newBooking.hours;
						newBooking.adjBrm = newBooking.brm;

						Bookings.insert( newBooking );
					} else {
						console.warn( 'Rejected. This item already exists.' );
					}
				}
				// show form again
				template.uploading.set(false);
			},
		});
	}
});