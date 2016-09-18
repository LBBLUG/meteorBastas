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
