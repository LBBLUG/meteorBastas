import { HomePageData } from '../../../../imports/api/homePageData.js';
import { HomePageBanner } from '../../../../imports/api/homePageBanner.js';
import { MessagingSettings } from '../../../../imports/api/messagingSettings.js';

Template.homeBody.onCreated(function() {
    this.subscribe('homePageData');
    this.subscribe('homePageBanner');
    this.subscribe('activeMsgSetup');
});

Template.homeBody.onRendered(function() {
    // let noEmailSettings = Session.get("NoEmailSet");
    setTimeout(function() {
        let msgSettings = MessagingSettings.findOne({ active: true });
        console.dir(msgSettings);
        if (typeof msgSettings == 'undefined' || msgSettings == null || msgSettings == "") {
            // add an if user is in role Admin then show this...
            if (Roles.userIsInRole(Meteor.userId(), 'Admin')) {
                // console.log("Client side didn't find email settings.");
                M.toast({html: 'You need to add Email Settings', displayLength: 15000, classes: "red"});
            }
        }
    }, 1100);
});

Template.homeBody.helpers({
    getHomeDatas: function() {
        return HomePageData.find({ isCurrent: true });
    },
    getHomeBanners: function() {
        return HomePageBanner.find({ isCurrent: true });
    },
    even: function (value) {
    if ((value % 2) === 0) {
        var isEven = true;
    } else {
        isEven = false;
    }
        return isEven;
    },
    homeBannersExist: function() {
        if (HomePageBanner.find({ isCurrent: true }).count() > 0) {
            return true;
        } else {
            return false;
        }
    },
});
