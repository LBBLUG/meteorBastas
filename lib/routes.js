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

FlowRouter.route('/', {
    // the route name is used in the form of
    // FlowRouter.go('<name>'); to direct users to other
    // pages in the application.
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout', {user: 'homeBody'});
    }
});

FlowRouter.route('/home', {
    name: 'homeMain',
    action() {
        BlazeLayout.render('HomeLayout', {user: 'homeBody'});
    }
});

FlowRouter.route('/settings', {
    name: 'settings',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'setupHomeForm'});
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

FlowRouter.route('/recipientDetail', {
    name: 'recipientDetail',
    action() {
        BlazeLayout.render('AdminLayout', {admin: 'recipientDetail'});
    }
});
