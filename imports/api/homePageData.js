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
    'homePageData.insert' (infoText, imageFileName, imageFileLocation, isCurrent) {

        // make sure user is logged in
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add home page information.');
        }

        homePageData.insert ({
            infoText: infoText,
            imageFileName: imageFileName,
            imageFileLocation: imageFileLocation,
            isCurrent: isCurrent,
        });
    },
    'homePageData.update' (infoText, imageFileName, imageFileLocation, isCurrent) {

        // make sure user is logged in
        if (!this.userId) {
            throw new Meteor.Error('User is not authorized to add home page information.');
        }

        homPageData.update ({
            $set: {
                infoText: infoText,
                imageFileName: imageFileName,
                imageFileLocation: imageFileLocation,
                isCurrent: isCurrent,
            }
        })
    },
});
