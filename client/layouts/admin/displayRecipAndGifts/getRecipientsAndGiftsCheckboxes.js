import { Recipients } from '../../../../imports/api/recipients.js';

Template.getRecipientsAndGift.helpers({
    isSelected: function() {
        if (this.isSelected === "true") {
            return "checked";
        } else {
            return false;
        }
    },
    isCheckedIn: function() {
        if (this.checkedIn === "true") {
            return "checked";
        } else {
            return false;
        }
    },
    isOutForDelivery: function() {
        if (this.outForDelivery === "true") {
            return true;
        } else {
            return false;
        }
    },
    isDelivered: function() {
        if (this.delivered === "true") {
            return true;
        } else {
            return false;
        }
    },
});

Template.getRecipientsAndGiftsCheckboxes.events({
    'click .isSelected' (event, target) {
        console.log("Selected clicked: " + this._id);
        // call the method to update this stinkin' checkbox
    },
    'click .isCheckedIn' (event, target) {
        console.log("Checked In clicked: " + this._id);
    },
});
