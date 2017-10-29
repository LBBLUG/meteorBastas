import { Recipients } from '../../../../../imports/api/recipients.js';

Template.currentWebRecipients.onCreated(function() {
    this.autorun(() => {
        this.subscribe('webRecipients');
        this.subscribe('allUsers');
    });
});

Template.currentWebRecipients.helpers({
    webRecipientsCurr: function() {
        return Recipients.find({});
    },
    isWebRecipSel: function() {
        if (this.webRecipient === true) {
            return "checked";
        } else {
            return false;
        }
    },
    isSelectedByUser: function() {
        if (this.selectedBy_id != "" && this.selectedBy_id != null) {
            return true;
        } else {
            return false;
        }
    },
    giverAndPhone: function() {
        let userId = this.selectedBy_id;
        let giverInfo = Meteor.users.findOne({ _id: userId });
        if (typeof giverInfo != 'undefined' && giverInfo != "" && giverInfo != null) {
            let giverName = giverInfo.profile.firstName + " " + giverInfo.profile.lastName;
            let giverPhone = giverInfo.profile.cellPhone;
            let giver = giverName + " " + giverPhone;
            return giver;
        } else {
            return false;
        }
    }
});

Template.currentWebRecipients.events({
    'click .isWebRecip' (event) {
        event.preventDefault();

        // add code to set webRecipient property to false for this recipient.
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
})
