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

Template.selectedCB.helpers({
    isSelected: function() {
        if (this.selected === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.checkedInCB.helpers({
    isCheckedIn: function() {
        if (this.checkedIn === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.outForDeliveryCB.helpers({
    isOutForDelivery: function() {
        if (this.outForDelivery === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.deliveredCB.helpers({
    isDelivered: function() {
        if (this.delivered === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.getRecipientsAndGift.events({
    'click .isSelected' (event, target) {
        const selectedState = event.currentTarget.checked;
        const giftTypeInfo = this.giftType;
        const indexNo = this.index + 1
        console.log("Is selected should be called");
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
        const indexNo = this.index + 1;
        console.log("Is checked in should be called");
        // call the method to update the checkbox in database
        // if checked in is being set to true, we must also set Selected to true.
        if (checkedInState === true) {
            Meteor.call('CheckedIn.update', this._id, checkedInState, indexNo);
            Meteor.call('Selected.update', this._id, checkedInState, indexNo);
        } else if (checkedInState === false) {
            Meteor.call('CheckedIn.update', this._id, checkedInState, indexNo);
            Meteor.call('Delivered.update', this._id, checkedInState, indexNo);
            Meteor.call('OutForDelivery.update', this._id, checkedInState, indexNo);
        }
    },
    'click .isOutForDelivery' (event, target) {
        const outForDeliveryState = event.currentTarget.checked;
        const giftTypeInfo = this.giftType;
        const indexNo = this.index + 1;
        console.log("Is Out for Delivery should be called");
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
        }
    },
    'click .isDelivered' (event, target) {
        const isDeliveredState = event.currentTarget.checked;
        const giftTypeInfo = this.giftType;
        const indexNo = this.index + 1;
        console.log("Is delivered method should be called.");
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
});
