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

import { Recipients } from '../imports/api/recipients.js';
import { HomePageData } from '../imports/api/homePageData.js';
import { HomePageBanner } from '../imports/api/homePageBanner.js';
import { BastasDB } from '../imports/api/bastasDb.js';

Meteor.publish("recipients", function(){
    if (Roles.userIsInRole(this.userId, ['Admin', 'Editor', 'Adder', 'Viewer'])) {
        return Recipients.find({});
    }
});

Meteor.publish("homePageData", function() {
    return HomePageData.find({});
});

Meteor.publish("homePageBanner", function() {
    return HomePageBanner.find({ isCurrent: true });
});

Meteor.publish("recipientsGeneralUser", function() {
    return Recipients.find({ gifts: { $elemMatch: { selected: true }}}, { "name.first": 1, "gifts.giftType": 1, "gifts.giftSize": 1, "gifts.selected": 1 });
});

Meteor.publish("allUsers", function() {
    if (Roles.userIsInRole(this.userId, 'Admin')) {
        return Meteor.users.find({});
    }
});

Meteor.publish("backups", function() {
    return BastasDB.find({});
});
