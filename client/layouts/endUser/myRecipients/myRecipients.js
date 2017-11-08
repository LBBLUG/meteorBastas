import { Recipients } from '../../../../imports/api/recipients.js';

Template.myRecipients.onCreated(function() {
    this.subscribe('giveAGiftSet');
});

Template.myRecipients.onRendered(function() {
    completeByMe = [];
    Session.set("giftBoughtChanged", false);
});

Template.myRecipients.helpers({
    areMyRecipients: function() {
        return Recipients.find(
            {
                webSelected: true,
                selectedBy_id: Meteor.userId(),
                marked_Purchased: false
            }
        );
    },
    giftBoughtChanged: function() {
        let giftBought = Session.get("giftBoughtChanged");
        return giftBought;
    }
});

Template.myRecipients.events({
    'click .giftBought' (event) {
        let thisRecipient = event.currentTarget.id;
        console.log("ID of Target Complete: " + thisRecipient);

        var completeState = event.currentTarget.checked;

        Session.set("giftBoughtChanged", true);

        if (completeState === true) {
            completeByMe.push(thisRecipient);
            Session.set("completeByMe", completeByMe);
        } else {
            completeByMe.splice($.inArray(thisRecipient), 1);
            Session.set("completeByMe", completeByMe);
        }
    },
    'click .completeThese' (event) {
        event.preventDefault();

        // write changes to database for user.
        let completeTotal = Session.get("completeByMe");

        if (completeTotal == '' || completeTotal == null) {
            Session.set("snackbarText", "Please Update at least 1 Gift Purchase to Save.");
            Session.set("snackbarColor", "orange");
            showSnackbar();
        } else {
            Meteor.call("CompleteGifts.update", completeTotal, function(err, result) {
                if (err) {
                    Session.set("snackbarText", "Error: Please Try Again.");
                    Session.set("snackbarColor", "red");
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Gift Status Updated!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                }
            });
        }
    },
    'click .removeFromList' (event) {
        event.preventDefault();

        let recipientId = this._id;

        console.log("Removed from list: " recipientId);
    }
});
