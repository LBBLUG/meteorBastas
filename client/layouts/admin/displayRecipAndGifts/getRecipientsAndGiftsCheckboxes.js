import { Recipients } from '../../../../imports/api/recipients.js';


Template.selectedCB.helpers({
    isSelected: function() {
        if (this.selected === "true") {
            return checked;
        }
    },
});

Template.getRecipientsAndGift.helpers({
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
    'click .isSelected' (event, template) {
        const cTarget = event.currentTarget.checked;
        const id = this._id;
        console.log(cTarget + " | " + id);
        // Meteor.call('Selected.update', this._id, !this.checked);
    },
});

Template.getRecipientsAndGift.events({
    'click .isCheckedIn' (event, template) {
        const cTarget = event.currentTarget.checked;
        const id = this._id;
        console.log(cTarget + " | " + id);
    },
});
