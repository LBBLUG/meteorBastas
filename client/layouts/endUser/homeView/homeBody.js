import { HomePageData } from '../../../../imports/api/homePageData.js';
import { HomePageBanner } from '../../../../imports/api/homePageBanner.js';

Meteor.subscribe('homePageData');
Meteor.subscribe('homePageBanner');

Template.homeBody.onRendered(function() {
    let noEmailSettings = Session.get("NoEmailSet");
    if (noEmailSettings == true) {
        console.log("Hey!");
        Materialize.toast('You need to add Email Settings', 20000, "red");
    }
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
