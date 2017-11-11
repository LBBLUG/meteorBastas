import { ReminderMsgs } from '../../../../../../imports/api/reminderMsgs.js';

Template.singleEmail.onCreated(function() {
    this.subscribe('reminderMessages');
    this.subscribe('allUsers');
});

Template.singleEmail.onRendered(function() {
    setTimeout(function() {
        $('select').material_select();
    }, 500);

    $('textarea#custEmailBody').characterCounter();
    Session.set('showCust', false);
});

Template.singleEmail.helpers({
    userEmailList: function(){
        return Meteor.users.find({});
    },
    userEmail: function() {
        return this.emails[0].address;
    },
    emailTmplList: function() {
        return ReminderMsgs.find({});
    },
    usersName: function() {
        let idOfEmail = Session.get("idOfEmail");
        if (idOfEmail) {
            let userInfo = Meteor.users.findOne({ _id: idOfEmail });
            Session.set("salutation", "Dear " + userInfo.profile.firstName + " " + userInfo.profile.lastName);
            Session.set("toEmail", userInfo.emails[0].address);
            // // console.log("toEmail: " + userInfo.emails[0].address);
            return (userInfo.profile.firstName + " " + userInfo.profile.lastName);
        }
    },
    showCustom: function() {
        return Session.get('showCust');
    },
    emailTemplate: function() {
        let templateId = Session.get("idOfTemplate");
        return ReminderMsgs.find({ _id: templateId });
    },
});

Template.singleEmail.events({
    'change #customOrTmpl' (event) {
        event.preventDefault();

        let customOrTmpl = $("#customOrTmpl").val();

        if (customOrTmpl == 'Custom') {
            Session.set('showCust', true);
        } else {
            Session.set('showCust', false);
            Session.set("idOfTemplate", customOrTmpl);
        }
    },
    'change #getUserEmail' (event) {
        event.preventDefault();

        let idOfEmail = $("#getUserEmail").val();
        // console.log("ID selected: " + idOfEmail);
        Session.set("idOfEmail", idOfEmail);
    },
    'click .cancelSendSingleEmail' (event) {
        event.preventDefault();

        // set the drop-downs back to original value, and hide the email section.

    },
    'click .sendSingleEmail' (event) {
        event.preventDefault();

        let sendType = Session.get('showCust');

        if (sendType == true) {
            // get values for custom email
            let toUser = Session.get("toEmail");
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
                Meteor.call('sendSingleReminderEmail', toUser, from, subject, body, function(err, result) {
                    if (err) {
                        // console.log("An Error occurred sending email: " + err);
                        Session.set("snackbarText", "Sending Email Failed!");
                        Session.set("snackbarColor", "red");
                        showSnackbar();
                    } else {
                        Session.set("snackbarText", "Email Sent!");
                        Session.set("snackbarColor", "green");
                        showSnackbar();
                    }
                });
            }
        } else {
            // get user email and template id
            let toUser = Session.get("toEmail");
            let emailTmpl = $("#customOrTmpl").val();
            // console.log("Reminder Message ID: " + emailTmpl);


            let emailTmplInfo = ReminderMsgs.findOne({ _id: emailTmpl });
            let subject = emailTmplInfo.subjectLine;
            let tmplBody = emailTmplInfo.reminderSalutation + "<br /><br /> " + emailTmplInfo.reminderText + "<br /><br /> " + emailTmplInfo.reminderClosing;
            let from = Meteor.user().emails[0].address;

            Meteor.call('sendSingleReminderEmail', toUser, from, subject, tmplBody, function(err, result) {
                if (err) {
                    // console.log("An Error occurred sending email: " + err);
                    Session.set("snackbarText", "Sending Email Failed!");
                    Session.set("snackbarColor", "red");
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Email Sent!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                }
            });
        }

    },
});
