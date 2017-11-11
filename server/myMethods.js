/*
BASTAS created in Meteor.  The BASTAS (Be A Santa To A Senior) application
gives operators of this program the ability to track gifts selected onlie,
gifts checked in by volunteers giving to a Senior, and delivery of the gifts
to the recipients each season.

Copyright (C) 2016  Brian McGonagill - On Behalf of the Lubbock Linux Users Group

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recipients } from '../imports/api/recipients.js';
import { BastasDB } from '../imports/api/bastasDb.js';

Meteor.methods({
    newRole(id, newUserRole, currRole) {
        Roles.removeUsersFromRoles(id, currRole);
        Roles.addUsersToRoles(id, newUserRole);
        return;
    },
    'get.CheckedInCount' () {
        // console.log("getting checked in gifts:");

        var keepGifts = {
            $project: {
                "gifts.checkedIn": 1,
                _id: 1
            }
        }

        var expandGifts = {
            $unwind: "$gifts"
        }

        var filterByCheckedIn = {
            $match: {
                "gifts.checkedIn": true,
            }
        }

        var count = {
            $group: {
                _id: "checkedIn",
                count: {
                    $sum: 1
                }
            }
        }

        var checkedInGifts = Recipients.aggregate([
            keepGifts,
            expandGifts,
            filterByCheckedIn,
            count
        ]);
        console.dir(checkedInGifts);
        return checkedInGifts;

    },
    'get.totalGifts' () {
        // console.log("getting total gifts:");

        var totalGifts = Recipients.aggregate({
            $unwind: "$gifts"
        }, {
            $group: {
                _id: '',
                count: {
                    $sum: 1
                }
            }
        });
        // console.dir(totalGifts);
        return totalGifts;

    },
    'delete.user' (userId) {

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add recipient information.');
        }

        Meteor.users.remove({ _id: userId });
    },
    'sendSingleReminderEmail' (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to send reminder emails.');
        }

        console.log(" ---- **** ---- **** -----")
        console.log("To: " + to);
        console.log("From: " + from);
        console.log("Subject: " + subject);
        console.log(" ---- **** ---- **** -----");

        // Let other method calls from the same client start running, without
        // waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            html: text
        });
    },
    'sendMultReminderEmails' (to, from, subject, text) {
        check(to, [String]);
        check([from, subject, text], [String]);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to send batch emails.');
        }

        // Let other method calls from the same client start running, without
        // waiting for the email sending to complete.
        this.unblock();

        // loop through to email addresses, and send the emails out.
        for (i = 0; i < to.length; i++) {
            let toThisOne = to[i];
            Email.send({
                to: toThisOne,
                from: from,
                subject: subject,
                html: text
            });
        }
    },
});
