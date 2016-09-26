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


Template.recipientDetail.onRendered(function() {
    $('select').material_select();
});

Template.recipientDetail.events({
    'click .closeNoSave' (event) {
        event.preventDefault();
        var detailModal = document.getElementById("detailsFormView");
        detailModal.style.display = "none";
    },
    // add the Save / Update here.  Update all items even if they aren't changed.

});

Template.recipientDetail.helpers({
    getRecipDetails: function() {
        recipientId = Session.get( "recipientId" );
        return Recipients.find({ _id: recipientId});
    },
});

// Helpers for Checkboxes / swtiches
Template.detailSelected.helpers({
    isSelected: function() {
        if (this.selected === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.detailCheckedIn.helpers({
    isCheckedIn: function() {
        if (this.checkedIn === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.detailOutForDelivery.helpers({
    isOutForDelivery: function() {
        if (this.outForDelivery === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.detailDelivered.helpers({
    isDelivered: function() {
        if (this.delivered === true) {
            return "checked";
        } else {
            return false;
        }
    },
});
