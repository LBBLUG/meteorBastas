import { ReminderMsgs } from '../../../../../../imports/api/reminderMsgs.js';
import { Recipients } from '../../../../../../imports/api/recipients.js';

Template.batchEmail.onCreated(function() {
    this.subscribe('reminderMessages');
    this.subscribe('allUsers');
    this.subscribe('recipients');
});

Template.batchEmail.onRendered(function() {
    setTimeout(function() {
        $('select').material_select();
    }, 500);

    $('textarea#custEmailBody').characterCounter();
    Session.set('showCust', false);
    giversToSendTo = {};
});

Template.batchEmail.helpers({
    emailTmplList: function() {
        return ReminderMsgs.find({});
    },
    emailTemplate: function() {
        let templateId = Session.get("idOfTemplate");
        return ReminderMsgs.find({ _id: templateId });
    },
    showCustom: function() {
        return Session.get('showCust');
    },
    outstanding: function() {
        return Recipients.find({ webSelected: true, webRecipient: true, marked_Purchased: false });
    },
});

Template.batchEmail.events({
    'change #customOrTmplBatch' (event) {
        event.preventDefault();

        let customOrTmpl = $("#customOrTmplBatch").val();

        if (customOrTmpl == 'Custom') {
            Session.set('showCust', true);
        } else {
            Session.set('showCust', false);
            Session.set("idOfTemplate", customOrTmpl);
        }
    },
    'click .cancelSendBatchEmail' (event) {
        event.preventDefault();

        // set the drop-downs back to original value, and hide the email section.

    },
    'click .sendBatchEmail' (event) {
        event.preventDefault();

        let sendType = Session.get('showCust');
        let toUsers = Session.get('giversToSendTo');

        if (sendType == true) {
            // get values for custom email
            // **** need to get emails array from grid selection

            let subject = $("#custEmailSubject").val();
            let text = $("#custEmailBody").val();
            let close = $("#custEmailClose").val();
            let salutation = Session.get("salutation");

            let body = salutation + "<br /><br />" + text + "<br /><br />" + close;
            let from = Meteor.user().emails[0].address;

            if (salutation == "" || salutation == null || text == "" || text == null || subject == "" || subject == null) {
                Session.set("snackbarText", "Salutation, Body, and Subject are required!");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Meteor.call('sendBatchReminderEmail', toUsers, from, subject, body, function(err, result) {
                    if (err) {
                        console.log("An Error occurred sending emails: " + err);
                        Session.set("snackbarText", "Sending Email Failed!");
                        Session.set("snackbarColor", "red");
                        showSnackbar();
                    } else {
                        Session.set("snackbarText", "Emails Sent!");
                        Session.set("snackbarColor", "green");
                        showSnackbar();
                    }
                });
            }
        } else {
            // get user email and template id
            // get users array of emails to send to

            let emailTmpl = $("#customOrTmpl").val();
            console.log("Reminder Message ID: " + emailTmpl);

            let emailTmplInfo = ReminderMsgs.findOne({ _id: emailTmpl });
            let subject = emailTmplInfo.subjectLine;
            let tmplBody = emailTmplInfo.reminderSalutation + "<br /><br /> " + emailTmplInfo.reminderText + "<br /><br /> " + emailTmplInfo.reminderClosing;
            let from = Meteor.user().emails[0].address;

            Meteor.call('sendBatchReminderEmail', toUsers, from, subject, tmplBody, function(err, result) {
                if (err) {
                    console.log("An Error occurred sending emails: " + err);
                    Session.set("snackbarText", "Sending Email Failed!");
                    Session.set("snackbarColor", "red");
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Emails Sent!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                }
            });
        }

    },
    'click .selectToSend' (event) {
        let state = event.currentTarget.checked;
        let recipientId = this._id;
        let giverEmail = this.selectedBy_email;
        if (state == true) {
            // add the checked item to the object

            giversToSendTo.recipientId = giverEmail;
            Session.set("giversToSendTo", giversToSendTo);
            console.log(giversToSendTo);
        } else {
            // remove the unchecked item from the object

            delete giversToSendTo.recipientId;
            Session.set("giversToSendTo", giversToSendTo);
            console.log(giversToSendTo);
        }
    },
});
