import { Recipients } from '../../../../../imports/api/recipients.js';

Template.currentWebRecipients.onCreated(function() {
    this.autorun(() => {
        this.subscribe('webRecipients');
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
});

Template.currentWebRecipients.events({
    'click .isWebRecip' (event) {
        event.preventDefault();

        // add code to set webRecipient property to false for this recipient.
        const state = event.currentTarget.checked;
        // const indexNo = this.index + 1

        Meteor.call('webRecip.update', this._id, state, function(err, result){
            if (err) {

            } else {

            }
        });
    },
})