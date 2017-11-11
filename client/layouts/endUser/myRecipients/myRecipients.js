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
    'click .markPurchaseComplete' (event) {
        let thisRecipient = this._id;

        Meteor.call("CompleteGifts.update", thisRecipient, function(err, result) {
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
    },
    'click .removeFromList' (event) {
        event.preventDefault();

        let recipientId = this._id;

        Meteor.call("UnSelectRecipient", recipientId, function(err, result) {
            if (err) {
                Session.set("snackbarText", "Error: Please Try Again.");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Session.set("snackbarText", "Recipient Removed From Your List.");
                Session.set("snackbarColor", "green");
                showSnackbar();
            }
        });
    }
});
