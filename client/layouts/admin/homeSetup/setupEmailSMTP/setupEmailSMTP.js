import { MessagingSettings } from '../../../../../imports/api/messagingSettings.js';

Template.setupEmailSMTP.onCreated(function() {
    this.subscribe("activeMsgSetup");
});

Template.setupEmailSMTP.onRendered(function() {
    // get an active email setup

});

Template.setupEmailSMTP.helpers({
    emailSettings: function() {
        let msgSettings = MessagingSettings.findOne({});
        if (typeof msgSettings != 'undefined') {
            Session.set("editSettings", true);
            // console.log("Edit Settings: true");
            return MessagingSettings.findOne({});
        } else {
            // console.log("Edit Settings: false");
            return false;
        }
    },
    editSettings: function() {
        let editSettingsSet = Session.get("editSettings");
        return editSettingsSet;
    },
});

Template.setupEmailSMTP.events({
    'click #saveEmailSetup' (event) {
        event.preventDefault();

        let editMode = Session.get("EditSettings");
        let editId = Session.get("SettingsId");
        let emailUser = $("#emailUser").val();
        let emailPass = $("#userPass").val();
        let emailSrv = $("#smtpSrvURL").val();
        let emailPort = $("#smtpPort").val();

        if (editMode == true) {
            // update existing active email settings
            Meteor.call('msgSettings.edit', editId, emailUser, emailPass, emailSrv, emailPort, function(err, result) {
                if (err) {
                    Session.set("snackbarText", "Error Updatingn Email Settings");
                    Session.set("snackbarColor", "red");
                    // console.log("Error updating email settings: " + err);
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Email Settings Updated!");
                    Session.set("snackbarColor", "green");
                    Session.set("NoEmailSet", false);
                    showSnackbar();
                }
            });
        } else {
            // add new active email settings
            Meteor.call("msgSettings.insert", emailUser, emailPass, emailSrv, emailPort, function(err, result) {
                if (err) {
                    Session.set("snackbarText", "Error Updatingn Email Settings");
                    Session.set("snackbarColor", "red");
                    // console.log("Error adding email settings: " + err);
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Email Settings Added!");
                    Session.set("snackbarColor", "green");
                    Session.set("NoEmailSet", false);
                    showSnackbar();
                    let msgSettings = MessagingSettings.findOne({ active: true });
                    Meteor.call('setEmailFromServer', msgSettings);
                }
            });
        }
    },
});
