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

import { Recipients } from '../../../../imports/api/recipients.js';

Template.recipientDetailUpdate.events({
    'click .closeUpdateNoSave' (event) {
        event.preventDefault();
        var detailUpdateModal = document.getElementById("detailsUpdateFormView");
        detailUpdateModal.style.display = "none";
    },
    // add the Save / Update here.  Update all items even if they aren't changed.
    'click .saveDetail' (event) {
        event.preventDefault();
        console.log('Save Clicked.');

        var recipId = Session.get("recipientId");
        var bastasId = $("#bastasId").val();
        var route = $("#route").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var gender = $("#gender").val();
        var streetAddress = $("#streetAddress").val();
        var complexName = $("#complexName").val();
        var aptNo = $("#aptNo").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zip = $("#zip").val();
        var homePhone = $("#homePhone").val();
        var cellPhone = $("#cellPhone").val();
        var notes = $("#notes").val();

        if (gender !== 'F' && gender !== 'M' && gender !== '') {
            Session.set("snackbarText", "You must use a proper Gender.");
            Session.set("snackbarColor", "red");
        } else {
            Meteor.call('details.update', recipId, bastasId, route, firstName, lastName, gender, streetAddress, complexName, aptNo, city, state, zip, homePhone, cellPhone, notes, function(err, results) {
                if (err) {
                    console.log('Error: Unable to update details - ' + err);
                } else {
                    console.log('Detail updated successfully.');
                    // TODO Add Snackbar notification of success

                }
            });
        }
    },
});

Template.giftDetailUpdateForm.events({
    'click .closeUpdateNoSave' (event) {
        event.preventDefault();
        var detailUpdateGiftModal = document.getElementById("detailsUpdateGiftView");
        detailUpdateGiftModal.style.display = "none";
    },

});

Template.registerHelper( 'getDetails', () => {
    recipientId = Session.get( "recipientId" );
    return Recipients.find({ _id: recipientId });
});

// Template.giftDetailUpdateForm.helpers({
//     getGiftDetails: function() {
//         recipientId = Session.get( "recipientId" );
//         return Recipients.find({ _id: recipientId });
//     },
// });
//
// Template.recipientDetail.helpers({
//     getRecipDetails: function() {
//         recipientId = Session.get( "recipientId" );
//         return Recipients.find({ _id: recipientId });
//     },
// });
//
// Template.recipientDetailUpdate.helpers({
//     getRecipDetails: function() {
//         recipientId = Session.get( "recipientId" );
//         return Recipients.find({ _id: recipientId});
//     },
// });

Template.recipientDetail.events({
    'click .closeNoSave' (event) {
        event.preventDefault();
        var detailModal = document.getElementById("detailsFormView");
        detailModal.style.display = "none";
    },
    'click .editRecipient' (event) {
        event.preventDefault();
        if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor'])) {
            console.log("Edit Details clicked: " + recipientId);
            var recipientDetailUpdateModal = document.getElementById("detailsUpdateFormView");
            recipientDetailUpdateModal.style.display = "block";
        } else {
            myModalTitle = "Not Authorized";
            myModalText = "It appears you are not authorized to view detailed information about recipients.  If you believe this to be in error, please contact your system administrator.";
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        }
    },
    'click .editGift' (event) {
        event.preventDefault();
        if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor'])) {
            console.log("Edit Gift Details clicked: " + recipientId);
            var giftDetailUpdateModal = document.getElementById("detailsUpdateGiftView");
            giftDetailUpdateModal.style.display = "block";
        } else {
            myModalTitle = "Not Authorized";
            myModalText = "It appears you are not authorized to view detailed information about recipients.  If you believe this to be in error, please contact your system administrator.";
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        }
    },
});
