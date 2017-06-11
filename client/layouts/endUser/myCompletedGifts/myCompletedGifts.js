import { Recipients } from '../../../../imports/api/recipients.js';

Template.myCompletedGifts.onCreated(function() {
    this.subscribe('myCompletedGifts');
});

Template.myCompletedGifts.helpers({
    completedRecipients: function() {
        return Recipients.find({});
    },
});
