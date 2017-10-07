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
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const HomePageData = new Mongo.Collection('homePageData');

HomePageData.allow({
    insert: function(userId, doc) {
        // if user id exists, allow insert
        return !!userId;
    }
});

Meteor.methods({
    'homePageData.insert' (infoText, imageEncoded, infoURL, isCurrent) {
        // console.log('Made it to home setup Method.');
        // console.log('Info on method is: ' + infoText + ', ' + isCurrent);

        // make sure user is logged in
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add home page information.');
        }

        return HomePageData.insert({
            infoText: infoText,
            imageFileEncoded: imageEncoded,
            infoURL: infoURL,
            isCurrent: isCurrent,
            addedOn: new Date(),
            addedBy: Meteor.user().emails[0].address,
            updatedOn: "na",
            updatedBy: "na",
        });
    },
    'homePageData.update' (infoId, infoTextSent) {

        check(infoTextSent, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add home page information.');
        }

        return HomePageData.update({ _id: infoId }, {
            $set: {
                infoText: infoTextSent,
                updatedOn: new Date(),
                updatedBy: Meteor.user().emails[0].address,
        }});
    },
    'homePageData.delete' (infoId) {

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add home page information.');
        }

        HomePageData.remove({ _id: infoId});
    },
    'update.setCurrent' (itemId, setCurrent) {
        check(setCurrent, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add home page information.');
        }

        return HomePageData.update({ _id: itemId} , {
            $set: {
                isCurrent: setCurrent,
                updatedOn: new Date(),
                updatedBy: Meteor.user().emails[0].address,
            }});
    },
});
