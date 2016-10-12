/*
BASTAS created in Meteor.  The BASTAS (Be A Santa To A Senior) application
gives operators of this program the ability to track gifts selected onlie,
gifts checked in by volunteers giving to a Senior, and delivery of the gifts
to the recipients each season.

Copyright (C) 2016  Brian McGonagill - On Behalf of the Lubbock Linux Users Group

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Routes.js holds the routes that control where the user interface
// goes when a user clicks on different buttons / links / navigation
// items in the application

var adminRoutes = FlowRouter.group({
    prefix: '/admin',
});

var userRoutes = FlowRouter.group({
    prefix: '/user',
});

userRoutes.route('/', {
    // the route name is used in the form of
    // FlowRouter.go('<name>'); to direct users to other
    // pages in the application.
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout', {user: 'homeBody'});
    }
});

userRoutes.route('/home', {
    name: 'homeMain',
    action() {
        BlazeLayout.render('HomeLayout', {user: 'homeBody'});
    }
});

userRoutes.route('/giveAGift', {
    name: 'giveAGift',
    action() {
        BlazeLayout.render('HomeLayout', {user: 'giveAGift'});
    }
})

adminRoutes.route('/settings', {
    name: 'settings',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'setupHomeForm'});
    }
});

adminRoutes.route('/setupPageBanner', {
    name: 'setupPageBanner',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'setupHomePageBanner'});
    }
});

adminRoutes.route('/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'dashboard'});
    }
});

adminRoutes.route('/addRecipients', {
    name: 'settingsAddRecipients',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'setupAddRecipients'});
    }
});

adminRoutes.route('/recipientsList', {
    name: 'recipientsList',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'displayRecipAndGifts'});
    }
});

adminRoutes.route('/importRecipients', {
    name: 'importRecipients',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'importRecipients'});
    }
});

adminRoutes.route('/recipientDetail', {
    name: 'recipientDetail',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'recipientDetail'});
    }
});

adminRoutes.route('/manageUsers', {
    name: 'manageUsers',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'manageUsers'});
    }
});
