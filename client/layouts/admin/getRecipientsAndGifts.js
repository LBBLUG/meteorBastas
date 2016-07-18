import { Recipients } from '../../../imports/api/recipients.js';

Template.displayRecipAndGifts.helpers({
    getRecipientsAndGifts() {
        return Recipients.find({});
    },
});

Template.getRecipientsAndGift.helpers({
    isSelected: function() {
        if (this.selected === "true") {
            return true;
        } else {
            return false;
        }
    },
    isCheckedIn: function() {
        if (this.checkedIn === "true") {
            return true;
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

Template.getRecipientsAndGift.events({
    'click .isSelected' () {
        console.log("ID: " + this._id + " | checked state sent: " + !this.checked);
        Meteor.call('Selected.update', this._id, !this.checked);
    },
    'click .getRecipDetail' () {
        // now route to the new page and pull the detail for the row the user utilized to select the button.
    }
});
