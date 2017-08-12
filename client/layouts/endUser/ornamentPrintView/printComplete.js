import { Recipients } from '../../../../imports/api/recipients.js';

Template.printComplete.onCreated(function() {
    this.subscribe('giveAGiftSet');
});

Template.printComplete.helpers({
    completedRecipients: function() {
        return Recipients.find(
            {
                webSelected: true,
                selectedBy_id: Meteor.userId(),
                marked_Purchased: true
            }
        );
    },
});
