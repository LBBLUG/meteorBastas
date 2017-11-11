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

Template.displayAllRecipients.onCreated(function() {
    this.subscribe("recipients");
});

Template.displayAllRecipients.helpers({
    findAllRecipients: function() {
        return Recipients.find({});
    },
});

Template.displayAllRecipients.events({
    'input .textSearch' (event, target) {
        var $rows = $('#table tr.trMainData');
        $('#search').keyup(function() {
            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

            $rows.show().filter(function() {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });
    },
    'click .checkFilter' (event) {
         // // console.log('checked or unchecked');
         var colId = event.currentTarget.id;
         var state = event.currentTarget.checked;
         // // console.log('State of ' + colId + ' is now ' + state);
         // // console.log('Unchecked Count: ' + $('input:checkbox.isSelected:not(:checked)').length);
         // // console.log('Checked Count: ' + $('input:checkbox.isSelected:checked').length);

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
             $('.trMainData:hidden').show();
         }
     },
});

Template.displayAllGifts.helpers({
    isWeb: function() {
        if (this.webRecipient === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.displayAllGifts.events({
    'click .details' (event, target) {
         if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor', 'Viewer'])) {
             Session.set( "recipientId", this._id );
             // // console.log("Details clicked: " + this._id);
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
     'click .isSelected' (event, target) {
         const selectedState = event.currentTarget.checked;
         const giftTypeInfo = this.giftType;
         const indexNo = this.index +1;
         // // console.log("Is selected should be called");
         // call the method to update this checkbox
         if (selectedState === false) {
             Meteor.call('Selected.update', this._id, selectedState, indexNo);
             Meteor.call('Delivered.update', this._id, selectedState, indexNo);
             Meteor.call('OutForDelivery.update', this._id, selectedState, indexNo);
             Meteor.call('CheckedIn.update', this._id, selectedState, indexNo);
         } else {
             Meteor.call('Selected.update', this._id, selectedState, indexNo);
         }

     },
     'click .isCheckedIn' (event, target) {
         const checkedInState = event.currentTarget.checked;
         const giftTypeInfo = this.giftType;
         const indexNo = this.index +1;
         // // console.log("Is checked in should be called");
         // call the method to update the checkbox in database
         // if checked in is being set to true, we must also set Selected to true.
         if (checkedInState === true) {
             Meteor.call('CheckedIn.update', this._id, checkedInState, indexNo);
             Meteor.call('Selected.update', this._id, checkedInState, indexNo);
         } else if (checkedInState === false) {
             Meteor.call('CheckedIn.update', this._id, checkedInState, indexNo);
             Meteor.call('Delivered.update', this._id, checkedInState, indexNo);
             Meteor.call('OutForDelivery.update', this._id, checkedInState, indexNo);
         } else {
             Meteor.call('CheckedIn.update', this._id, checkedInState, indexNo);
         }
     },
     'click .isOutForDelivery' (event, target) {
         const outForDeliveryState = event.currentTarget.checked;
         const giftTypeInfo = this.giftType;
         const indexNo = this.index +1;
         // // console.log("Is Out for Delivery should be called");
         // call method to set checkbox in db
         // if outForDelivery is being set to true, then we must also set Selected and
         // checkedIn to true.
         if (outForDeliveryState === true) {
             Meteor.call('OutForDelivery.update', this._id, outForDeliveryState, indexNo);
             Meteor.call('CheckedIn.update', this._id, outForDeliveryState, indexNo);
             Meteor.call('Selected.update', this._id, outForDeliveryState, indexNo);
         } else if (outForDeliveryState === false) {
             Meteor.call('OutForDelivery.update', this._id, outForDeliveryState, indexNo);
             Meteor.call('Delivered.update', this._id, outForDeliveryState, indexNo);
         } else {
             Meteor.call('OutForDelivery.update', this._id, outForDeliveryState, indexNo);
         }
     },
     'click .isDelivered' (event, target) {
         const isDeliveredState = event.currentTarget.checked;
         const giftTypeInfo = this.giftType;
         const indexNo = this.index +1;
         // // console.log("Is delivered method should be called.");
         //call method to set checkbox state in db
         // if isDelivered is being set to true, then we must set Selected, CheckedIn,
         // and OutForDelivery to true as well.
         if (isDeliveredState === true) {
             Meteor.call('Delivered.update', this._id, isDeliveredState, indexNo);
             Meteor.call('OutForDelivery.update', this._id, isDeliveredState, indexNo);
             Meteor.call('CheckedIn.update', this._id, isDeliveredState, indexNo);
             Meteor.call('Selected.update', this._id, isDeliveredState, indexNo);
         } else {
             Meteor.call('Delivered.update', this._id, isDeliveredState, indexNo);
         }
     },
     'click .isWebRecip' (event) {
         event.preventDefault();

         // add code to toggle the webRecipient property for this recipient.
         const state = event.currentTarget.checked;
         // const indexNo = this.index + 1

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
});
