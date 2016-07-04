// Routes.js holds the routes that control where the user interface
// goes when a user clicks on different buttons / links / navigation
// items in the application

FlowRouter.route('/', {
    // the route name is used in the form of
    // FlowRouter.go('<name>'); to direct users to other
    // pages in the application.
    name: 'home',
    action() {
        // the layout renderer is used with the template
        // name in the single quotes below that the route
        // name should take the user to.
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/home', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/settings', {
    name: 'settings',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'setupHomeForm'});
        // add something to show the active nav item
    }
});

FlowRouter.route('/addRecipients', {
    name: 'settingsAddRecipients',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'setupAddRecipients'});
    }
});

FlowRouter.route('/recipientsList', {
    name: 'recipientsList',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'displayRecipAndGifts'});
    }
});
