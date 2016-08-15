import { Recipients } from '../../../../imports/api/recipients.js';


Template.selectedCB.helpers({
    isSelected: function() {
        if (this.selected === "true") {
            return checked;
        }
    },
});

Template.getRecipientsAndGiftCheckbox.helpers({
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

Template.selectedCB.events({
    'click .isSelected' () {
        console.log("ID: " + this._id + " | checked state sent: " + !this.checked);
        Meteor.call('Selected.update', this._id, !this.checked);
    },
});
