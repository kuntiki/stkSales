import { Template } from 'meteor/templating';

import Papa from 'papaparse';

import './uploads.html';

Template.uploads.onCreated( function uploadsOnCreated() {
	Template.instance().uploading = new ReactiveVar( false );
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
				// show form again
				template.uploading.set(false);
			},
		});
	}
});