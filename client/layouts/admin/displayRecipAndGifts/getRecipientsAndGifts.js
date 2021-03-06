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

// get the information from the mongoDB collection Recipients

Template.displayRecipAndGifts.onCreated(function() {
    this.subscribe("recipients");
});

Template.displayRecipAndGifts.helpers({
    getRecipientsAndGifts() {
        var searchType = Session.get("searchType");
        if (searchType === "bastasId") {
            var bastasID = Session.get("bastasIDEntered");
            return Recipients.find({ bastasId: bastasID });
        } else if (searchType === "routeNo") {
            var routeEntered = Session.get("routeEntered");
            return Recipients.find({ route: routeEntered });
        } else if (searchType === "name") {
            // // console.log("Name Search Type");
            var nameEntered = Session.get("nameEntered");
            return Recipients.find({ "name.last": { $regex: new RegExp(nameEntered, "i") }});
        } else if (searchType === "firstName") {
            var firstNameEntered = Session.get("firstNameEntered");
            return Recipients.find({ "name.first": { $regex: new RegExp(firstNameEntered, "i") }});
        }
    },
});

// use the textBox at the top to search for items in the grid as use types
Template.displayRecipAndGifts.events({
    'submit .searchID' (event) {
        event.preventDefault();
        var bastasID = $("#searchId").val();
        Session.set("bastasIDEntered", bastasID);
        Session.set("searchType", "bastasId");
    },
    'submit .searchRoute' (event) {
        event.preventDefault();
        var routeInfo = $("#searchroute").val();
        Session.set("routeEntered", routeInfo);
        Session.set("searchType", "routeNo");
    },
    'submit .searchName' (event) {
        event.preventDefault();
        const nameInfo = $("#searchName").val();
        // // console.log(nameInfo);
        Session.set("nameEntered", nameInfo);
        Session.set("searchType", "name");
    },
    'submit .searchFirstName' (event) {
        event.preventDefault();
        const firstName = $("#searchFirstName").val();
        Session.set("firstNameEntered", firstName);
        Session.set("searchType", "firstName");
    },
    'click .checkFilter' (event) {
        // console.log('checked or unchecked');
        var colId = event.currentTarget.id;
        var state = event.currentTarget.checked;
        // console.log('State of ' + colId + ' is now ' + state);
        // console.log('Unchecked Count: ' + $('input:checkbox.isSelected:not(:checked)').length);
        // console.log('Checked Count: ' + $('input:checkbox.isSelected:checked').length);

        if (state === true) {
            switch(colId) {
                case "selectedFilter":
                    $('input:checkbox.isSelected:not(:checked)').closest('.trMainData').hide();
                    $('input:checkbox.isSelected:checked:hidden').closest('.trMainData').show();
                    break;
                case "selectedFilterUnchecked":
                    $('input:checkbox.isSelected:checked').closest('.trMainData').hide();
                    $('input:checkbox.isSelected:not(:checked):hidden').closest('.trMainData').show();
                    break;
                case "checkedInFilter":
                    $('input:checkbox.isCheckedIn:not(:checked)').closest('.trMainData').hide();
                    $('input:checkbox.isCheckedIn:checked:hidden').closest('.trMainData').show();
                    break;
                case "checkedInFilterUnchecked":
                    $('input:checkbox.isCheckedIn:checked').closest('.trMainData').hide();
                    $('input:checkbox.isCheckedIn:not(:checked):hidden').closest('.trMainData').show();
                    break;
                case "outForDeliveryFilter":
                    $('input:checkbox.isOutForDelivery:not(:checked)').closest('.trMainData').hide();
                    $('input:checkbox.isOutForDelivery:checked:hidden').closest('.trMainData').show();
                    break;
                case "outForDeliveryFilterUnchecked":
                    $('input:checkbox.isOutForDelivery:checked').closest('.trMainData').hide();
                    $('input:checkbox.isOutForDelivery:not(:checked):hidden').closest('.trMainData').show();
                    break;
            }
        } else if (state === false) {
            $('table tr.trMainData:hidden').show();
        }
    },
});

Template.getRecipientsAndGift.onRendered(function() {
    Session.set("noteView", "read");
});

Template.getRecipientsAndGift.helpers({
    isWeb: function() {
        if (this.webRecipient === true) {
            return "checked";
        } else {
            return false;
        }
    },
    noteView: function() {
        return Session.get("noteView");
    }
});

// getDetails when button clicked for a row
Template.getRecipientsAndGift.events({
    'click .details' (event, target) {
        if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor', 'Viewer'])) {
            Session.set( "recipientId", this._id );
            // console.log("Details clicked: " + this._id);
            var recipientDetailModal = document.getElementById("detailsFormView");
            recipientDetailModal.style.display = "block";
        } else {
            myModalTitle = "Not Authorized";
            myModalText = "It appears you are not authorized to view detailed information about recipients.  If you believe this to be in error, please contact your system administrator.";
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        }
    },
    'click .delete' (event) {
        if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor'])) {
            Session.set( "recipientId", this._id);
            Session.set( "actionToTake", "deleteUser" );
            var myModal = document.getElementById("myModal");
            myModalTitle = "Delete Recipient and Gifts";
            myModalText = "You are about to delete this recipient. If you meant to do this click Ok.  If not close this warning with the 'checkmark' in the upper right.";
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        }
    },
    'click .isWebRecip' (event) {
        event.preventDefault();

        // add code to toggle the webRecipient property for this recipient.
        const state = event.currentTarget.checked;

        Meteor.call('webRecip.update', this._id, state, function(err, result){
            if (err) {
                Session.set("snackbarText", "Error changing state of Recipient for Web.");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Session.set("snackbarText", "Recipient Web State Changed Successfully.");
                Session.set("snackbarColor", "green");
                showSnackbar();
            }
        });
    },
    "click .clickToEdit" (event) {
        event.preventDefault();

        Session.set("noteView", "edit");
    },
    "click .saveNote" (event) {
        event.preventDefault();
        let noteId = event.currentTarget.id;
        console.log("Note Save triggered for: " + noteId);
        let noteText = $("#notes").val();

        Meteor.call('note.edit', noteId, noteText, function(err, result){
            if (err) {
                console.log("Error saveing note: " + err);
                Session.set("snackbarText", "Error saving note.");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Session.set("snackbarText", "Note Saved Successfully!");
                Session.set("snackbarColor", "green");
                showSnackbar();
                Session.set("noteView", "read");
            }
        });
    },
});
