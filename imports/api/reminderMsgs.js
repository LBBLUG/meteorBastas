import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ReminderMsgs = new Mongo.Collection('reminderMsgs');

ReminderMsgs.allow({
    insert: function(userId, doc) {
        // if user id exists, allow insert
        return !!userId;
    }
});

Meteor.methods({
    'insert.reminder' (remName, remSal, remText, remClose) {
        check(remName, String);
        check(remSal, String);
        check(remText, String);
        check(remClose, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized add Reminder Messages.');
        }

        return ReminderMsgs.insert({
            reminderName: remName,
            reminderSalutation: remSal,
            reminderText: remText,
            reminderClosing: remClose,
            addedBy: Meteor.user().emails[0].address,
            addedOn: new Date(),
        });
    },
    'delete.ReminderMsg' (reminderId) {
        check(reminderId, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized delete Reminder Messages.');
        }

        return ReminderMsgs.remove({ _id: reminderId });
    },
    'edit.ReminderMsg' (reminderId, remName, remSal, remText, remClose) {
        check(reminderId, String);
        check(remName, String);
        check(remSal, String);
        check(remText, String);
        check(remClose, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized edit Reminder Messages.');
        }

        return ReminderMsgs.update({ _id: reminderId }, {
            $set: {
                reminderName: remName,
                reminderSalutation: remSal,
                reminderText: remText,
                reminderClosing: remClose,
                updatedBy: Meteor.user().emails[0].address,
                updatedOn: new Date(),
            }
        });
    },
});
