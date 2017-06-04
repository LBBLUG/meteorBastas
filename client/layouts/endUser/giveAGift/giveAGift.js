import { Recipients } from '../../../../imports/api/recipients.js';

Template.giveAGift.onCreated(function() {
    this.subscribe('giveAGiftSet');
});

Template.giveAGift.onRendered(function() {
    selectForMe = [];
});

Template.giveAGift.helpers({
    isWebRecip: function() {
        return Recipients.find({});
    },
});

Template.giveAGift.events({
    'click .selectFromWeb' (event) {
        var thisRecipient = event.currentTarget.id;
        console.log("Id of Target: " + thisRecipient);

        const state = event.currentTarget.checked;

        if (state === true) {
            selectForMe.push(thisRecipient);
            Session.set("selectForMe", selectForMe);
        } else {
            selectForMe.splice($.inArray(removeItem, thisRecipient), 1);
            Session.set("selectForMe", selectForMe);
        }
    },
    'click .selectThese' (event) {
        event.preventDefault();
        var selectFinal = Session.get("selectForMe");

        // console.log("All Selected: " + selectFinal);

        // now loop through these and add the givers userId and email to these recipients
        // and toggle the webSelected value to true.

        Meteor.call('SelectForWeb.update', selectFinal, function(err, result){
            if (err) {
                Session.set("snackbarText", "Error: Please Try Again.");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Session.set("snackbarText", "Recipients Added to Your List.");
                Session.set("snackbarColor", "green");
                showSnackbar();
            }
        });
    },
});
