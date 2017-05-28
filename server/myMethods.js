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

import {
    Meteor
} from 'meteor/meteor';
import {
    Recipients
} from '../imports/api/recipients.js';
import {
    BastasDB
} from '../imports/api/bastasDb.js';
import shelljs from 'shelljs';

Meteor.methods({
    newRole(id, newUserRole, currRole) {
        Roles.removeUsersFromRoles(id, currRole);
        Roles.addUsersToRoles(id, newUserRole);
        return;
    },
    'backup.bastasDB' (outputPath) {
        // console.log("Got in the backup method");
        // check if user is logged in before continuing
        if (!this.userId) {
            throw new Meteor.Error('User is not logged in, and not authorized to create a home page banner.');
        }

        var backupdt = new Date();

        shelljs.exec('mongodump -h 127.0.0.1 --port 3001 --out ' + outputPath + ' -d meteor', function(code, out, err) {
            // console.log("Exit code: " + code);
            // console.log("Std Out: " + out);
            // console.log("Std Err:" + err)
        });
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
});
