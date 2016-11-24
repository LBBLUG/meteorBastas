import { BastasDB } from '../../../../imports/api/bastasDb.js';
import shelljs from 'shelljs';

Template.backupUI.onCreated(function() {
    this.subscribe("backups");
})

Template.backupUI.helpers({
    lastBackup: function() {
        return BastasDB.findOne({}, {sort: { backupDateTime: -1, limi: 1 }});
    },
});

Template.backupUI.events({
    'click #backupNow' (event) {
        event.preventDefault();
        var enteredPath = $("#savePath").val();
        var now = new Date();

        var additionalpath = moment(now).format("YYYYMMDD-hhmmss");
        var savePath = enteredPath + '_' + additionalpath;
        if (enteredPath == '') {
            Session.set("snackbarText", "Please provide a valid path");
            Session.set("snackbarColor", "red");
            showSnackbar();
        } else {
            Meteor.call('backup.bastasDB', savePath, function(err, result) {
                if (err) {
                    Session.set("snackbarText", "Backup Failed!");
                    Session.set("snackbarColor", "red");
                    showSnackbar();
                } else {
                    Session.set("snackbarText", "Backup Successful!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                    Meteor.call('backup.complete', savePath);
                }
            });
        }
    },
});
