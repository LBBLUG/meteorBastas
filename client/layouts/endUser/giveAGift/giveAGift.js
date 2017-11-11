import { Recipients } from '../../../../imports/api/recipients.js';

Template.giveAGift.onCreated(function() {
    this.subscribe('giveAGiftSet');
});

Template.giveAGift.onRendered(function() {
    selectForMe = [];
    Session.set("madeChange", false);
});

Template.giveAGift.helpers({
    isWebRecip: function() {
        return Recipients.find({ webSelected: false });
    },
    changeMade: function() {
        // a change is detected by user checking a person
        let madeChange = Session.get("madeChange");
        return madeChange;
    },
});

Template.giveAGift.events({
    'click .selectFromWeb' (event) {
        let thisRecipient = this._id;
        // console.log("Id of Target: " + thisRecipient);

        Session.set("madeChange", true);

        Meteor.call('SelectForWeb.update', thisRecipient, function(err, result){
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
