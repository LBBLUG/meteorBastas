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
    'homePageData.insert' (infoText, imageEncoded, isCurrent) {
        console.log('Made it to home setup Method.');
        console.log('Info on method is: ' + infoText + ', ' + isCurrent);

        // make sure user is logged in
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add home page information.');
        } else {
            console.log('User is logged in');
        }

        return HomePageData.insert({
            infoText: infoText,
            imageFileEncoded: imageEncoded,
            isCurrent: isCurrent,
        });
    },
});
