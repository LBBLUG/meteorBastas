import { Recipients } from '../imports/api/recipients.js';
import { HomePageData } from '../imports/api/homePageData.js';

Meteor.publish("recipients", function(){
    return Recipients.find({});
});

Meteor.publish("homePageData", function() {
    return HomePageData.find({ isCurrent: true })
});
