import { MessagingSettings } from '../../../../../imports/api/messagingSettings.js';

Template.setupEmailSMTP.onCreated(function() {
    this.subscribe("activeMsgSetup");
});

Template.setupEmailSMTP.onRendered(function() {
    // get an active email setup
    let msgSettings = MessagingSettings.findOne({});
    if (msgSettings) {
        Session.set("SettingsId", MessagingSettings._id);
        Session.set("EditSettings", true);
    } else {
        Session.set("EditSettings", false);
    }
});

Template.setupEmailSMTP.helpers({
    emailSettings: function() {
        if (Session.get("EditSeetings") == true) {
            return MessagingSettings.findOne({});
        } else {
            return false
        }
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

        if (editMode) {
            // update existing active email settings
            Meteor.call('msgSettings.edit', editId, emailUser, emailPass, emailSrv, emailPort, function(err, result) {
                if (err) {
                    Session.set("snackbarText", "Error Updatingn Email Settings");
                    Session.set("snackbarColor", "red");
                    console.log("Error updating email settings: " + err);
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Email Settings Updated!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                }
            });
        } else {
            // add new active email settings
            Meteor.call("msgSettings.insert", emailUser, emailPass, emailSrv, emailPort, function(err, result) {
                if (err) {
                    Session.set("snackbarText", "Error Updatingn Email Settings");
                    Session.set("snackbarColor", "red");
                    console.log("Error adding email settings: " + err);
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Email Settings Added!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                }
            });
        }
    },
});
