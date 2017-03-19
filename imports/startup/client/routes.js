import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/home.js';
import '../../ui/components/customers.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'app_home' });
  },
});

// Customer pages
var customerGroup = FlowRouter.group({
  prefix: '/customers',
});

customerGroup.route('/', {
  name: 'App.customers',
  action() {
    BlazeLayout.render('App_body', { main: 'customers'});
  },
});

customerGroup.route('/create', {
  name: 'App.customers.create',
  action() {
    console.log("create customer");
    BlazeLayout.render('App_body', { main: 'customers_create'});
  },
});

customerGroup.route('/edit/:id', {
  name: 'App.customers.edit',
  action() {
    console.log("edit customer");
    BlazeLayout.render('App_body', { main: 'customers_edit'});
  },
});
// // the App_notFound template is used for unknown routes and missing lists
// FlowRouter.notFound = {
//   action() {
//     BlazeLayout.render('App_body', { main: 'App_notFound' });
//   },
// };