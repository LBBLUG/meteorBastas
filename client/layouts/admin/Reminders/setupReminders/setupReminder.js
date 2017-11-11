import { ReminderMsgs } from '../../../../../imports/api/reminderMsgs.js';

Template.setupReminder.onCreated(function() {
    this.subscribe('reminderMessages');
});

Template.setupReminder.onRendered(function() {
    $('.tooltipped').tooltip({delay: 50});
    Session.set("editReminderMode", false);
});

Template.setupReminder.helpers({
    getSavedReminders: function() {
        return ReminderMsgs.find({});
    },
    reminderMode: function() {
        let reminder = Session.get("editReminderMode");
        // // console.log("Mode: " + reminder);
        return reminder;
    },
    editReminders: function() {
        let reminderId = Session.get("reminderId");
        Materialize.updateTextFields();
        return ReminderMsgs.findOne({ _id: reminderId });
    },
});

Template.setupReminder.events({
    'click #btnSubmitReminderMsgSetup' (event) {
        event.preventDefault();

        let editMode = Session.get("editReminderMode");

        let reminderId = Session.get("reminderId");

        let subjectLine = $("#subjectLine").val();
        let salutation = $("#salutation").val();
        let messageToGiver = $("#messageToGiver").val();
        let closingLine = $("#closingLine").val();
        let reminderMsgName = $("#reminderMsgName").val();

        if (messageToGiver == null || messageToGiver == "") {
            Session.set("snackbarText", "Message Text is a Required Field.");
            Session.set("snackbarColor", "red");
            showSnackbar();
        } else if (reminderMsgName == null || reminderMsgName == "") {
            Session.set("snackbarText", "Reminder Name is a Required Field.");
            Session.set("snackbarColor", "red");
            showSnackbar();
        } else if (subjectLine == null || subjectLine == "") {
            Session.set("snackbarText", "Subject Line is a Required Field.");
            Session.set("snackbarColor", "red");
            showSnackbar();
        } else {
            if (editMode == true) {
                Session.set("editReminderMode", false);

                Meteor.call('edit.ReminderMsg', reminderId, reminderMsgName, subjectLine, salutation, messageToGiver, closingLine, function(err, result) {
                    if (err) {
                        Session.set("snackbarText", "Error Occurred adding Reminder!");
                        // console.log("Error adding reminder: " + err);
                        Session.set("snackbarColor", "red");
                        showSnackbar();
                    } else {
                        Session.set("snackbarText", "Reminder Added Successfully");
                        Session.set("snackbarColor", "green");
                        showSnackbar();
                    }
                });
            } else {
                Session.set("editReminderMode", false);

                Meteor.call('insert.reminder', reminderMsgName, subjectLine, salutation, messageToGiver, closingLine, function(err, result) {
                    if (err) {
                        Session.set("snackbarText", "Error Occurred adding Reminder!");
                        // console.log("Error adding reminder: " + err);
                        Session.set("snackbarColor", "red");
                        showSnackbar();
                    } else {
                        Session.set("snackbarText", "Reminder Added Successfully");
                        Session.set("snackbarColor", "green");
                        showSnackbar();
                    }
                });
            }
        }
    },
    'click #btnCancelReminderMsgSetup' (event) {
        event.preventDefault();

        document.getElementById("reminderSetupForm").reset();
    },
    'click .deleteReminder' (event) {
        event.preventDefault();

        let reminderId = this._id;

        Meteor.call('delete.ReminderMsg', reminderId, function(err, result) {
            if (err) {
                Session.set("snackbarText", "Error Occurred Deleting Reminder!");
                // console.log("Error deleting reminder: " + err);
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Session.set("snackbarText", "Reminder Deleted Successfully");
                Session.set("snackbarColor", "green");
                showSnackbar();
            }
        });
    },
    'click .editReminder' (event) {
        event.preventDefault();
        Session.set("reminderId", this._id);

        Session.set("editReminderMode", true);
    },
});
