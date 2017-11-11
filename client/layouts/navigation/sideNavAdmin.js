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

import { Recipients } from '../../../imports/api/recipients.js';

Template.sideNavAdmin.onCreated(function() {
    this.subscribe("getMyRecipients");
    this.subscribe("myCompletedGifts");
});

Template.sideNavAdmin.helpers({
    chosenRecips: function() {
        return Recipients.find(
            {
                webRecipient: true,
                webSelected: true,
                selectedBy_id: Meteor.userId(),
                marked_Purchased: false
            }
        ).count();
    },
    completeRecips: function() {
        return Recipients.find(
            {
                webRecipient: true,
                webSelected: true,
                selectedBy_id: Meteor.userId(),
                marked_Purchased: true
            },
        ).count();
        // // console.log("Meteor.userId() gives: " + Meteor.userId());
    },
});

Template.sideNavAdmin.events({
    'click  .navBtn' (event) {
        event.preventDefault();
        var clickedTarget = event.target.id;
        // // console.log("User clicked: " + clickedTarget);
        if (clickedTarget === 'home' || clickedTarget === 'giveAGift' || clickedTarget === 'myRecipients' || clickedTarget === 'myCompletedGifts') {
            FlowRouter.go('/user/' + clickedTarget);
        } else if (clickedTarget !== "signIn" && clickedTarget !== "signOut") {
            FlowRouter.go('/admin/' + clickedTarget);
        }
        document.getElementById("adminMenu").style.width = "0";
    },
    'click #signIn': () => {
        var signInModal = document.getElementById('signInModal');
        signInModal.style.display = "block";
    },
    'click #signOut': () => {
        AccountsTemplates.logout();
        FlowRouter.go('/user/home');
    },
    'click .closebtn': () => {
        document.getElementById("adminMenu").style.width = "0";
    },
});
