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
        console.log("Selected clicked: " + this._id + " is " + selectedState + " with Gift Type " + this.giftType);
        // call the method to update this checkbox
        Meteor.call('Selected.update', this._id, selectedState, giftTypeInfo);
    },
    'click .isCheckedIn' (event, target) {
        const checkedInState = event.currentTarget.checked;
        const giftTypeInfo = this.giftType;
        console.log("Checked In clicked: " + this._id);
        // call the method to update the checkbox in database
        Meteor.call('CheckedIn.update', this._id, checkedInState, giftTypeInfo);
    },
    'click .isOutForDelivery' (event, target) {
        const outForDeliveryState = event.currentTarget.checked;
        const giftTypeInfo = this.giftType;

        // call method to set checkbox in db
        Meteor.call('OutForDelivery.update', this._id, outForDeliveryState, giftTypeInfo);
    },
    'click .isDelivered' (event, target) {
        const isDeliveredState = event.currentTarget.checked;
        const giftTypeInfo = this.giftType;

        //call method to set checkbox state in db
        Meteor.call('Delivered.update', this._id, isDeliveredState, giftTypeInfo);
    },
});
