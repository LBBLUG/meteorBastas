// Routes.js holds the routes that control where the user interface
// goes when a user clicks on different buttons / links / navigation
// items in the application

FlowRouter.route('/', {
    // the route name is used in the form of
    // FlowRouter.go('<name>'); to direct users to other
    // pages in the application.
    name: 'home',
    action: function(params) {
        Tracker.autorun(function() {
                BlazeLayout.render('AdminLayout', {admin: 'HomeLayout'});
        });
    }
});

FlowRouter.route('/home', {
    name: 'home',
    action: function(params) {
        Tracker.autorun(function() {
                BlazeLayout.render('AdminLayout', {admin: 'HomeLayout'});
        });
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

FlowRouter.route('/importRecipients', {
    name: 'importRecipients',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'importRecipients'});
    }
});
