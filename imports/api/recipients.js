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

export const Recipients = new Mongo.Collection('recipients');

Recipients.allow({
    insert: function(userId, doc) {
        // if user id exists, allow insert
        return !!userId;
    }
});

Meteor.methods({
    // insert a new Recipients
    'recipients.insert' (ibastasId, iroute, ifirstName, ilastName, igender, istreetAddress, icomplexName, iaptNo, icity, istate, izip, ihomePhone, icellPhone, inotes) {

        //check that the info being passed in is of the correct type
        check(ibastasId, String);
        check(iroute, String);
        check(ifirstName, String);
        check(ilastName, String);
        check(igender, String);
        check(istreetAddress, String);
        check(icomplexName, String);
        check(iaptNo, String);
        check(icity, String);
        check(istate, String);
        check(izip, String);
        check(ihomePhone, String);
        check(icellPhone, String);
        check(inotes, String);

        // make sure a user is logged in before posting the recipient info
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add recipient information.');
        }

        // insert the recipient information to the database
        return Recipients.insert({
            bastasId: ibastasId,
            route: iroute,
            name: {
                first: ifirstName,
                last: ilastName,
            },
            gender: igender,
            address: {
                streetAddress: istreetAddress,
                complexName: icomplexName,
                aptNo: iaptNo,
                city: icity,
                state: istate,
                zip: izip,
            },
            phone: {
                home: ihomePhone,
                cell: icellPhone,
            },
            notes: inotes,
            gifts: [],
            enteredBy: Meteor.user().emails[0].address,
            addedOn: new Date(),
        });
    },
    // edit a recipient
    'recipients.update' (irecipientsId, ibastasId, iroute, ifirstName, ilastName, igender, istreetAddress, icomplexName, iaptNo, icity, istate, izip, ihomePhone, icellPhone, inotes) {
        //check that the info being passed in is of the correct type
        check(recipientsId, String);
        check(ibastasId, String);
        check(iroute, String);
        check(ifirstName, String);
        check(ilastName, String);
        check(igender, String);
        check(istreetAddress, String);
        check(icomplexName, String);
        check(iaptNo, String);
        check(icity, String);
        check(istate, String);
        check(izip, String);
        check(ihomePhone, String);
        check(icellPhone, String);
        check(inotes, String);

        // make sure a user is logged in before posting the recipient info
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to update recipient information.');
        }

        // update the recipient info

        Recipients.update(recipientsId, {
            $set: {
                bastasId: ibastasId,
                route: iroute,
                name: {
                    first: ifirstName,
                    last: ilastName,
                },
                gender: igender,
                address: {
                    streetAddress: istreetAddress,
                    complexName: icomplexName,
                    aptNo: iaptNo,
                    city: icity,
                    state: istate,
                    zip: izip,
                },
                phone: {
                    home: ihomePhone,
                    cell: icellPhone,
                },
                gifts: [],
                notes: inotes,
                editedBy: Meteor.users.fineOne(this.userId).username,
                lastEditedOn: new Date(),
            }
        });
    },
    'gifts.add' (irecipientsId, igiftType, igiftSize, iselected, icheckedIn, ioutForDelivery, idelivered, ideliveryPerson, ideliveryPhone) {
        // check that the info being sent is what's expected


        // check that the user is logged in and has the right role
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add gift information, or is not logged in.');
        }

        // add the gift info to the recipient
        Recipients.update(irecipientsId, {
            $addToSet: {
                gifts: {
                    giftType: igiftType,
                    giftSize: igiftSize,
                    selected: iselected,
                    checkedIn: icheckedIn,
                    outForDelivery: ioutForDelivery,
                    delivered: idelivered,
                    deliveryPerson: ideliveryPerson,
                    deliveryPhone: ideliveryPhone,
                }
            },
            $set: {
                editedBy: Meteor.user().emails[0].address,
                lastEditedOn: new Date(),
            }
        });
    },
    'Recipients.import' (importData) {
        // check the data if needed
        console.log('--------------------------------------------------');
        console.dir(importData);
        // ensure the user is logged in and has privileges
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to import recipient information, or is not logged in.');
        }

        // start breaking the importData down into its parts
        for (i = 0; i < importData.data.length; i++) {
            if (!importData.data[i].giftType2 && !importData.data[i].giftType3) {
                Recipients.insert({
                    bastasId: importData.data[i].bastasId,
                    route: importData.data[i].route,
                    name: {
                        first: importData.data[i].first,
                        last: importData.data[i].last,
                    },
                    gender: importData.data[i].gender,
                    address: {
                        streetAddress: importData.data[i].streetAddress,
                        complexName: importData.data[i].complexName,
                        aptNo: importData.data[i].aptNo,
                        city: importData.data[i].city,
                        state: importData.data[i].state,
                        zip: importData.data[i].zip,
                    },
                    phone: {
                        home: importData.data[i].home,
                        cell: importData.data[i].cell,
                    },
                    gifts: [{
                        giftType: importData.data[i].giftType1,
                        giftSize: importData.data[i].giftSize1,
                        selected: importData.data[i].isSelected1,
                        checkedIn: importData.data[i].checkedIn1,
                        outForDelivery: importData.data[i].outForDelivery1,
                        delivered: importData.data[i].delivered1,
                        deliveryPerson: importData.data[i].deliveryPerson1,
                        deliveryPhone: importData.data[i].deliveryPhone1,
                    }],
                    notes: importData.data[i].notes,
                    enteredBy: Meteor.user().emails[0].address,
                    addedOn: new Date(),
                });
            } else if (importData.data[i].giftType2 && !importData.data[i].giftType3) {
                Recipients.insert({
                    bastasId: importData.data[i].bastasId,
                    route: importData.data[i].route,
                    name: {
                        first: importData.data[i].first,
                        last: importData.data[i].last,
                    },
                    gender: importData.data[i].gender,
                    address: {
                        streetAddress: importData.data[i].streetAddress,
                        complexName: importData.data[i].complexName,
                        aptNo: importData.data[i].aptNo,
                        city: importData.data[i].city,
                        state: importData.data[i].state,
                        zip: importData.data[i].zip,
                    },
                    phone: {
                        home: importData.data[i].home,
                        cell: importData.data[i].cell,
                    },
                    gifts: [{
                        giftType: importData.data[i].giftType1,
                        giftSize: importData.data[i].giftSize1,
                        selected: importData.data[i].isSelected1,
                        checkedIn: importData.data[i].checkedIn1,
                        outForDelivery: importData.data[i].outForDelivery1,
                        delivered: importData.data[i].delivered1,
                        deliveryPerson: importData.data[i].deliveryPerson1,
                        deliveryPhone: importData.data[i].deliveryPhone1,
                    }, {
                        giftType: importData.data[i].giftType2,
                        giftSize: importData.data[i].giftSize2,
                        selected: importData.data[i].isSelected2,
                        checkedIn: importData.data[i].checkedIn2,
                        outForDelivery: importData.data[i].outForDelivery2,
                        delivered: importData.data[i].delivered2,
                        deliveryPerson: importData.data[i].deliveryPerson2,
                        deliveryPhone: importData.data[i].deliveryPhone2,
                    }],
                    notes: importData.data[i].notes,
                    enteredBy: Meteor.user().emails[0].address,
                    addedOn: new Date(),
                });
            } else {
                Recipients.insert({
                    bastasId: importData.data[i].bastasId,
                    route: importData.data[i].route,
                    name: {
                        first: importData.data[i].first,
                        last: importData.data[i].last,
                    },
                    gender: importData.data[i].gender,
                    address: {
                        streetAddress: importData.data[i].streetAddress,
                        complexName: importData.data[i].complexName,
                        aptNo: importData.data[i].aptNo,
                        city: importData.data[i].city,
                        state: importData.data[i].state,
                        zip: importData.data[i].zip,
                    },
                    phone: {
                        home: importData.data[i].home,
                        cell: importData.data[i].cell,
                    },
                    gifts: [{
                        giftType: importData.data[i].giftType1,
                        giftSize: importData.data[i].giftSize1,
                        selected: importData.data[i].isSelected1,
                        checkedIn: importData.data[i].checkedIn1,
                        outForDelivery: importData.data[i].outForDelivery1,
                        delivered: importData.data[i].delivered1,
                        deliveryPerson: importData.data[i].deliveryPerson1,
                        deliveryPhone: importData.data[i].deliveryPhone1,
                    }, {
                        giftType: importData.data[i].giftType2,
                        giftSize: importData.data[i].giftSize2,
                        selected: importData.data[i].isSelected2,
                        checkedIn: importData.data[i].checkedIn2,
                        outForDelivery: importData.data[i].outForDelivery2,
                        delivered: importData.data[i].delivered2,
                        deliveryPerson: importData.data[i].deliveryPerson2,
                        deliveryPhone: importData.data[i].deliveryPhone2,
                    }, {
                        giftType: importData.data[i].giftType3,
                        giftSize: importData.data[i].giftSize3,
                        selected: importData.data[i].isSelected3,
                        checkedIn: importData.data[i].checkedIn3,
                        outForDelivery: importData.data[i].outForDelivery3,
                        delivered: importData.data[i].delivered3,
                        deliveryPerson: importData.data[i].deliveryPerson3,
                        deliveryPhone: importData.data[i].deliveryPhone3,
                    } ],
                    notes: importData.data[i].notes,
                    enteredBy: Meteor.user().emails[0].address,
                    addedOn: new Date(),
                });
            }
        }
    },
    'Selected.update' (recipientId, selectedState, giftTypeInfo) {
    Recipients.update({ _id: recipientId, "gifts.giftType": giftTypeInfo }, {
         $set: { 'gifts.$.selected': selectedState, } },
    );
    },
    'CheckedIn.update' (recipientId, selectedState, giftTypeInfo) {
        Recipients.update({ _id: recipientId, "gifts.giftType": giftTypeInfo }, {
            $set: { 'gifts.$.checkedIn': selectedState, } },
        );
    },
    'OutForDelivery.update' (recipientId, selectedState, giftTypeInfo) {
        Recipients.update({ _id: recipientId, "gifts.giftType": giftTypeInfo }, {
            $set: { 'gifts.$.outForDelivery': selectedState, } },
        );
    },
    'Delivered.update' (recipientId, selectedState, giftTypeInfo) {
        Recipients.update({ _id: recipientId, "gifts.giftType": giftTypeInfo }, {
            $set: { 'gifts.$.delivered': selectedState, } },
        );
    },
});
