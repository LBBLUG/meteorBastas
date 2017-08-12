import { Recipients } from '../../../../imports/api/recipients.js';

Template.myCompletedGifts.onCreated(function() {
    this.subscribe('giveAGiftSet');
});

Template.myCompletedGifts.helpers({
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

Template.myCompletedGifts.events({
    'click .printThese' (event) {
        event.preventDefault();

        FlowRouter.go("/user/printComplete");
    },
});
