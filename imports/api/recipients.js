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
        if (! this.userId) {
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
        if (! this.userId) {
            throw new Meteor.Error('User is not authorized to add recipient information.');
        }

        // update the recipient info

        Recipients.update(recipientsId, {$set: {
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
            editedBy: Meteor.users.fineOne(this.userId).username,
            lastEditedOn: new Date(),
        }
    });
    }


});
