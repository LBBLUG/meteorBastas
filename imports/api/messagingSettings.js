import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const MessagingSettings = new Mongo.Collection('messagingSettings');

MessagingSettings.allow({
    insert: function(userId, doc) {
        // if user id exists, allow insert
        return !!userId;
    }
});

Meteor.methods({
    'msgSettings.insert' (emailUser, emailPass, smtpSrvURL, smtpPort) {
        check(emailUser, String);
        check(smtpSrvURL, String);
        check(smtpPort, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add email / smtp information.');
        }

        MessagingSettings.insert({
            emailUser: emailUser,
            emailPasswd: emailPass,
            smtpSrvUrl: smtpSrvURL,
            smtpPort: smtpPort,
            active: true,
            addedBy: Meteor.user().emails[0].address,
            addedOn: new Date()
        });
    },
    'msgSettings.edit' (msgSettingsId, emailUser, emailPass,smtpSrvURL, smtpPort) {
        check(msgSettingsId, String);
        check(emailPass, String);
        check(emailUser, String);
        check(smtpSrvURL, String);
        check(smtpPort, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to edit email / smtp information.');
        }

        MessagingSettings.update({ _id: msgSettingsId }, {
            $set: {
                emailUser: emailUser,
                emailPasswd: emailPass,
                smtpSrvUrl: smtpSrvURL,
                smtpPort: smtpPort,
                editedBy: Meteor.user().emails[0].address,
                editedOn: new Date()
            }
        });
    },
    'msgSettings.delete' (msgSettingsId) {
        check(msgSettingsId, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to delete email / smtp information.');
        }

        MessagingSettings.update({ _id: msgSettingsId }, {
            $set: {
                active: false
            }
        });
    },
});
