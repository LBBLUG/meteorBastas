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
            webRecipient: false,
            webSelected: false,
            marked_Purchased: false,
            selectedBy_id: "",
            gifts: [],
            enteredBy: Meteor.user().emails[0].address,
            addedOn: new Date(),
        });
    },
    // edit a recipient
    'recipients.update' (recipientsId, ibastasId, iroute, ifirstName, ilastName, igender, istreetAddress, icomplexName, iaptNo, icity, istate, izip, ihomePhone, icellPhone, inotes) {
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
                notes: inotes,
                editedBy: Meteor.user().emails[0].address,
                lastEditedOn: new Date(),
            }
        });
    },
    'gifts.add' (irecipientsId, igiftNo, igiftType, igiftSize, iselected, icheckedIn, ioutForDelivery, idelivered, ideliveryPerson, ideliveryPhone) {
        // check that the info being sent is what's expected


        // check that the user is logged in and has the right role
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add gift information, or is not logged in.');
        }

        // add the gift info to the recipient
        Recipients.update(irecipientsId, {
            $addToSet: {
                gifts: {
                    giftNo: igiftNo,
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
    'gifts.update' (irecipientsId, igiftNo, giftInfo, giftType) {
        // // console.log("made it to the update for gifts.");
        // check that the info being sent is what's expected
        check(igiftNo, Number);
        check(giftInfo, String);
        check(giftType, String);

        var giftNumber = igiftNo.toString();

        switch(giftType) {
            case "giftType":
                Recipients.update({ _id: irecipientsId, "gifts.giftNo": giftNumber }, {
                    $set: {
                        "gifts.$.giftType": giftInfo,
                        editedBy: Meteor.user().emails[0].address,
                        lastEditedOn: new Date(),
                    }
                });
                break;
            case "giftSize":
                Recipients.update({ _id: irecipientsId, "gifts.giftNo": giftNumber }, {
                    $set: {
                        "gifts.$.giftSize": giftInfo,
                        editedBy: Meteor.user().emails[0].address,
                        lastEditedOn: new Date(),
                    }
                });
                break;
            case "deliveryPerson":
                Recipients.update({ _id: irecipientsId, "gifts.giftNo": giftNumber }, {
                    $set: {
                        "gifts.$.deliveryPerson": giftInfo,
                        editedBy: Meteor.user().emails[0].address,
                        lastEditedOn: new Date(),
                    }
                });
                break;
            case "deliveryPhone":
                Recipients.update({ _id: irecipientsId, "gifts.giftNo": giftNumber }, {
                    $set: {
                        "gifts.$.deliveryPhone": giftInfo,
                        editedBy: Meteor.user().emails[0].address,
                        lastEditedOn: new Date(),
                    }
                });
                break;
        }


    },
    'Recipients.import' (importData) {
        // check the data if needed
        // check(importData, { some object });

        // *** uncomment the 2 (two) lines below to see the data being imported in the server console.
        // // console.log('--------------------------------------------------');
        // console.dir(importData);

        // ensure the user is logged in and has privileges
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to import recipient information, or is not logged in.');
        }

        // NOTE I've done the import in a bit of an ugly way...the papa-parse engine is awesome, but
        // it doesn't support having mulitple columns with the same name, so I currently am limiting
        // the gifts to 3, and having to do some fun stuff here in case there's only 1 or 2 gifts,
        // and not three on a recipient... I'm still thinking on how to improve this and simplify it in
        // the future.

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
                        giftNo: 1,
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
                    webRecipient: importData.data[i].webRecipient,
                    webSelected: false,
                    marked_Purchased: false,
                    selectedBy_id: "",
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
                        giftNo: 1,
                        giftType: importData.data[i].giftType1,
                        giftSize: importData.data[i].giftSize1,
                        selected: importData.data[i].isSelected1,
                        checkedIn: importData.data[i].checkedIn1,
                        outForDelivery: importData.data[i].outForDelivery1,
                        delivered: importData.data[i].delivered1,
                        deliveryPerson: importData.data[i].deliveryPerson1,
                        deliveryPhone: importData.data[i].deliveryPhone1,
                    }, {
                        giftNo: 2,
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
                    webRecipient: importData.data[i].webRecipient,
                    webSelected: false,
                    marked_Purchased: false,
                    selectedBy_id: "",
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
                        giftNo: 1,
                        giftType: importData.data[i].giftType1,
                        giftSize: importData.data[i].giftSize1,
                        selected: importData.data[i].isSelected1,
                        checkedIn: importData.data[i].checkedIn1,
                        outForDelivery: importData.data[i].outForDelivery1,
                        delivered: importData.data[i].delivered1,
                        deliveryPerson: importData.data[i].deliveryPerson1,
                        deliveryPhone: importData.data[i].deliveryPhone1,
                    }, {
                        giftNo: 2,
                        giftType: importData.data[i].giftType2,
                        giftSize: importData.data[i].giftSize2,
                        selected: importData.data[i].isSelected2,
                        checkedIn: importData.data[i].checkedIn2,
                        outForDelivery: importData.data[i].outForDelivery2,
                        delivered: importData.data[i].delivered2,
                        deliveryPerson: importData.data[i].deliveryPerson2,
                        deliveryPhone: importData.data[i].deliveryPhone2,
                    }, {
                        giftNo: 3,
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
                    webRecipient: importData.data[i].webRecipient,
                    webSelected: false,
                    marked_Purchased: false,
                    selectedBy_id: "",
                    enteredBy: Meteor.user().emails[0].address,
                    addedOn: new Date(),
                });
            }
        }
    },
    'Selected.update' (recipientId, selectedState, indexNo) {
        return Recipients.update({ _id: recipientId, "gifts.giftNo": indexNo }, {
             $set: { 'gifts.$.selected': selectedState, editedBy: Meteor.user().emails[0].address,
             lastEditedOn: new Date(), } },
        );
    },
    'CheckedIn.update' (recipientId, selectedState, indexNo) {
        return Recipients.update({ _id: recipientId, "gifts.giftNo": indexNo }, {
            $set: { 'gifts.$.checkedIn': selectedState, editedBy: Meteor.user().emails[0].address,
            lastEditedOn: new Date(), } },
        );
    },
    'OutForDelivery.update' (recipientId, selectedState, giftTypeInfo) {
        return Recipients.update({ _id: recipientId, "gifts.giftType": giftTypeInfo }, {
            $set: { 'gifts.$.outForDelivery': selectedState, editedBy: Meteor.user().emails[0].address,
            lastEditedOn: new Date(), } },
        );
    },
    'Delivered.update' (recipientId, selectedState, giftTypeInfo) {
        return Recipients.update({ _id: recipientId, "gifts.giftType": giftTypeInfo }, {
            $set: { 'gifts.$.delivered': selectedState, editedBy: Meteor.user().emails[0].address,
            lastEditedOn: new Date(), } },
        );
    },
    getGift(id, giftNo) {
        var giftsFor = Recipients.find({ _id: id, "gifts.giftNo": giftNo  }, { "gifts.$": 1 });
        // // console.log(giftsFor);
        return giftsFor;
    },
    'deleteRecipient' (recipientId) {
        check(recipientId, String);
        // // console.log("--------------------------------");
        // // console.log(" User Deleted ");

        return Recipients.remove({ _id: recipientId });
    },
    'webRecip.update' (recipientId, state) {
        check(recipientId, String);
        check(state, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to make recipient web enabled, or is not logged in.');
        }

        if (state == true) {
            return Recipients.update({ _id: recipientId }, {
                 $set: {
                     webRecipient: state,
                     editedBy: Meteor.user().emails[0].address,
                     lastEditedOn: new Date(),
                    }
                });
        } else {
            for (giftsCount = 0; giftsCount < 3; giftsCount++) {
                let giftCount = giftsCount + 1;
                Recipients.update({ _id: recipientId, "gifts.giftNo": giftCount }, {
                     $set: {
                         'gifts.$.selected': false,
                         editedBy: Meteor.user().emails[0].address,
                         lastEditedOn: new Date(), } },
                );
            }

            return Recipients.update({ _id: recipientId }, {
                $set: {
                    webRecipient: state,
                    webSelected: false,
                    selectedBy_id: "",
                    selectedBy_email: "",
                    marked_Purchased: false,
                }
            });
        }
    },
    'SelectForWeb.update' (recipientIds) {
        check(recipientIds, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to select a web recipient, or is not logged in.');
        }

        let recipient = Recipients.findOne({ _id: recipientIds });
        let noGifts = recipient.gifts.length;

        if (noGifts == 1) {
            Recipients.update({ _id: recipientIds, "gifts.giftNo": noGifts }, {
                 $set: { 'gifts.$.selected': true } },
            );
        } else if (noGifts == 2)  {
            for (j = 0; j<noGifts; j++) {
                Recipients.update({ _id: recipientIds, "gifts.giftNo": j+1 }, {
                    $set: { 'gifts.$.selected': true }
                });
            }
        } else if (noGifts == 3) {
            for (k = 0; k<noGifts; k++) {
                Recipients.update({ _id: recipientIds, "gifts.giftNo": k+1 }, {
                    $set: { 'gifts.$.selected': true }
                });
            }
        }

        Recipients.update({ _id: recipientIds }, {
            $set: {
                webSelected: true,
                selectedBy_id: Meteor.userId(),
                selectedBy_email: Meteor.user().emails[0].address,
                marked_Purchased: false,
            }
        });
    },
    'CompleteGifts.update' (giftsBoughtRecipId) {
        check(giftsBoughtRecipId, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to update gift purchase information, or is not logged in.');
        }

        // query to see how many gifts the recipient has listed
        if (Recipients.findOne({ _id: giftsBoughtRecipId, "gifts.giftNo": 3 })) {
            var giftCount = 3;
        } else if (Recipients.findOne({ _id: giftsBoughtRecipId, "gifts.giftNo": 2 })) {
            var giftCount = 2;
        } else if (Recipients.findOne({ _id: giftsBoughtRecipId, "gifts.giftNo": 1 })) {
            var giftCount = 1
        } else {
            // console.log("No Gifts found for this recipient.");
        }

        for (g = 1; g <= giftCount; g++) {
            Recipients.update({ _id: giftsBoughtRecipId, "gifts.giftNo": g }, {
                $set: {
                    "gifts.$.selected": true,
                    marked_Purchased: true,
                }
            });
        }
    },
    'UnSelectRecipient' (recipientId) {
        check(recipientId, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to remove a recipient from this list, or is not logged in.');
        }

        // console.log("removing for ID " + recipientId);

        // query to see how many gifts the recipient has listed
        if (Recipients.findOne({ _id: recipientId, "gifts.giftNo": 3 })) {
            // // console.log("Found three gifts");
            var removeGifts = 3;
        } else if (Recipients.findOne({ _id:recipientId, "gifts.giftNo": 2 })) {
            // // console.log("found 2 gifts");
            var removeGifts = 2;
        } else if (Recipients.findOne({ _id: recipientId, "gifts.giftNo": 1 })) {
            // // console.log("Found 1 gift.");
            var removeGifts = 1;
        } else {
            // console.log("No Gifts found for this recipient.");
        }

        for (h=0; h < removeGifts; h++) {
            // // console.log("Removing gift " + (h+1));
            Recipients.update({ _id: recipientId, "gifts.giftNo": h+1 }, {
                $set: {
                    "gifts.$.selected": false,
                    marked_Purchased: false,
                    webSelected: false,
                    selectedBy_id: "",
                }
            });
        }
    },
    "note.edit" (recipientId, noteText) {
        check(noteText, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to remove a recipient from this list, or is not logged in.');
        }

        Recipients.update({ _id: recipientId}, {
            $set: {
                notes: noteText,
                editedBy: Meteor.user().emails[0].address,
                lastEditedOn: new Date(),
            }
        });
    },

    // get numbers for gift counts

});
