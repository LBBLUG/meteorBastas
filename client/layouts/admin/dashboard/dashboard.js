import { Recipients } from '../../../../imports/api/recipients.js';
import JustGage from 'justgage-meteor';
import { Errors } from '../../../../imports/api/error-log.js';

Template.dashboard.onCreated(function() {
    this.subscribe('recipients');
});

Template.countsWidget.onCreated(function() {
    this.subscribe('recipients');
    this.giftCount = new ReactiveVar(0); //define state with reactiveVar
    this.autorun(()=>{
        Meteor.call('get.totalGifts', function(err, result){
            if (err) {
                // console.log("Error: " + err);
                var errorType = "get count";
                var errorMsg = err;
                var templateName = "countsWidget";
                var fileName = "dashboard.js";
                var functionName = "Template.countsWidget.onCreated";
                Meteor.call('error.insert', errorType, errorMsg, templateName, fileName, functionName, function(err, result){
                    if (err) {
                        alert("An error occurred, and we attempted to log it in your database, but were unable to do so.  Please contact the maintainer of your application for assistance.");
                    } else {
                        Session.set("snackbarText", "An error occured, and was logged in your database.");
                        Session.set("snackbarColor", "orange");
                        showSnackbar();
                    }
                })
            } else {
                var count = result[0].count;
                Session.set("totalCount", count); //set state after method return result
            }
        });
        Meteor.call('get.CheckedInCount', function(err, result) {
            if (err) {
                // console.log("Error: " + err);
            } else {
                var checkedInCount = result[0].count;
                Session.set("checkedInCount", checkedInCount);
            }
        });
    });
});

Template.countsWidget.onRendered(function() {
    var total = Session.get("totalCount");
    var checkedIn = Session.get("checkedInCount");
    var percentage = Math.floor((checkedIn / total) * 100);
    // console.log("Percent complete = " + percentage);
    var checkedInG = new JustGage({
        id: "checkedInGage",
        value: percentage,
        min: 0,
        max: 100,
        symbol: "%",
        levelColors: ['#CE1B21', '#D0532A', '#FFC414', '#85A137'],
        title: ""
    });
});

Template.countsRecipWidget.onRendered(function() {
    var totalRecipients = Session.get('totalRecipients');
    var oneGift = Session.get('oneGift');
    var percent = Math.floor((oneGift / totalRecipients) * 100);
    // console.log("One Gift Percent: " + percent);
    var oneGiftR = new JustGage({
        id: "oneGiftRecip",
        value: percent,
        min: 0,
        max: 100,
        symbol: "%",
        levelColors: ['#CE1B21', '#D0532A', '#FFC414', '#85A137'],
        title: ""
    });
});


Template.countsWidget.helpers({
    CheckedInCount: function() {
        let instance = Template.instance();
        return Session.get("checkedInCount")
    },
    TotalGifts: function() {
        let instance = Template.instance();
        return Session.get("totalCount"); //get state
    },
});


Template.countsRecipWidget.helpers({
    atLeat1Gift: function() {
        var oneGift = Recipients.find({ "gifts.checkedIn": true }).count();
        Session.set('oneGift', oneGift);
        return oneGift;
    },
    totalRecips: function() {
       var totalRecipients = Recipients.find({}).count();
       Session.set('totalRecipients', totalRecipients);
       return totalRecipients;
    },
});

Template.missingGiftsWidget.onRendered(function() {
    var totalRecipients = Session.get('totalRecipients');
    var missingGiftRecipients = Session.get('missingGiftRecipients');
    var percentMissing = Math.floor((missingGiftRecipients / totalRecipients) * 100);
    // console.log(missingGiftRecipients + " / " + totalRecipients + " * 100 = " + percentMissing);
    var missingGiftR = new JustGage({
        id: "missingAGiftRecip",
        value: percentMissing,
        min: 0,
        max: 100,
        symbol: "%",
        levelColors: ['#CE1B21', '#D0532A', '#FFC414', '#85A137'],
        title: ""
    });
});

Template.missingGiftsWidget.helpers({
    missingGifts: function() {
        var missingGiftRecipients = Recipients.find({ $or: [{ "gifts.checkedIn": null }, { "gifts.checkedIn": false }]}).count();
        Session.set("missingGiftRecipients", missingGiftRecipients);
        return missingGiftRecipients;
    },
    totalRecips: function() {
        var totalRecipients = Session.get('totalRecipients');
        return totalRecipients;
    },
});

Template.noGiftsWidget.onRendered(function() {
    var totalRecipients = Session.get('totalRecipients');
    var noGiftRecipients = Session.get('noGiftRecipients');
    var percentNone = Math.floor((noGiftRecipients / totalRecipients) * 100);
    // console.log(noGiftRecipients + " / " + totalRecipients + " * 100 = " + percentNone);
    var noGiftR = new JustGage({
        id: "noGiftRecip",
        value: percentNone,
        min: 0,
        max: 100,
        symbol: "%",
        levelColors: ['#CE1B21', '#D0532A', '#FFC414', '#85A137'],
        title: ""
    });
});

Template.noGiftsWidget.helpers({
    noGifts: function() {
        var noGiftRecipients = Recipients.find({ "gifts.checkedIn": { $ne: true }}).count();
        Session.set("noGiftRecipients", noGiftRecipients);
        return noGiftRecipients;
    },
    totalRecips: function() {
        var totalRecipients = Session.get('totalRecipients');
        return totalRecipients;
    },
});

Template.allGiftsWidget.onRendered(function() {
    var totalRecipients = Session.get('totalRecipients');
    var allGiftsRecip = Session.get('allGiftsRecip');
    var percentAll = Math.floor((allGiftsRecip / totalRecipients) * 100);
    // console.log(allGiftsRecip + " / " + totalRecipients + " * 100 = " + percentAll);
    var noGiftR = new JustGage({
        id: "AllGiftRecip",
        value: percentAll,
        min: 0,
        max: 100,
        symbol: "%",
        levelColors: ['#CE1B21', '#D0532A', '#FFC414', '#85A137'],
        title: ""
    });
});

Template.allGiftsWidget.helpers({
    allGifts: function() {
        var allGiftsRecip = Recipients.find({ $and: [{ "gifts.checkedIn": { $ne: null }}, { "gifts.checkedIn": { $ne: false }}]}).count();
        Session.set("allGiftsRecip", allGiftsRecip);
        return allGiftsRecip;
    },
    totalRecips: function() {
        var totalRecipients = Session.get('totalRecipients');
        return totalRecipients;
    },
});
