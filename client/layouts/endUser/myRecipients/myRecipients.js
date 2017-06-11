import { Recipients } from '../../../../imports/api/recipients.js';

Template.myRecipients.onCreated(function() {
    this.subscribe('getMyRecipients');
});

Template.myRecipients.onRendered(function() {
    completeByMe = [];
});

Template.myRecipients.helpers({
    areMyRecipients: function() {
        return Recipients.find({});
    },
});

Template.myRecipients.events({
    'click .giftBought' (event) {
        let thisRecipient = event.currentTarget.id;
        console.log("ID of Target Complete: " + thisRecipient);

        var completeState = event.currentTarget.checked;

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
            Session.set("snackbarText", "Please Select at least 1 Recipient.");
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
});
