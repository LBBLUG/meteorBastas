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
        // // console.log('Save Clicked.');

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
            Meteor.call('recipients.update', recipId, bastasId, route, firstName, lastName, gender, streetAddress, complexName, aptNo, city, state, zip, homePhone, cellPhone, notes, function(err, results) {
                if (err) {
                    // // console.log('Error: Unable to update details - ' + err);
                } else {
                    // // console.log('Detail updated successfully.');
                    Session.set("snackbarText", "Recipient Detail updated successfully!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                    // Now close the modal
                    var detailUpdateModal = document.getElementById("detailsUpdateFormView");
                    detailUpdateModal.style.display = "none";
                }
            });
        }
    },
});

Template.giftDetailUpdateForm.events({
    'click .closeUpdateNoSave, click .closeEditGifts, click .doneEditGifts' (event) {
        event.preventDefault();
        var detailUpdateGiftModal = document.getElementById("detailsUpdateGiftView");
        detailUpdateGiftModal.style.display = "none";
    },
    'change .detail' (event) {
        event.preventDefault();
        var targetId = event.currentTarget.id;
        var giftNo = Number(targetId.substr(targetId.length - 1)) + 1;
        var giftType = targetId.slice(0, -1);
        // // console.log("Gift type key is: " + giftType);
        // // console.log("field id changed is: " + targetId);
        // // console.log("Gift No is " + giftNo)
        var newGiftValue = $("#" + targetId).val();
        // // console.log("new value is: " + newGiftValue);
        if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor'])) {
            Meteor.call('gifts.update', Session.get("recipientId"), giftNo, newGiftValue, giftType, function(err, result) {
                if (err) {
                    // // console.log("Error occurred updating giftInfo: " + err);
                } else {
                    // // console.log("Gift updated successfully!");
                    Session.set("snackbarText", "Gift updated successfully!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                }
            });
        }
    },
});

Template.registerHelper( 'getDetails', () => {
    recipientId = Session.get( "recipientId" );
    return Recipients.find({ _id: recipientId });
});

Template.recipientDetail.events({
    'click .closeNoSave, click .closeShowDetail, click .doneShowDetail' (event) {
        event.preventDefault();
        var detailModal = document.getElementById("detailsFormView");
        detailModal.style.display = "none";
    },
    'click .editRecipient' (event) {
        event.preventDefault();
        if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor'])) {
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
