import { Recipients } from '../../../../imports/api/recipients.js';

Template.countsWidget.helpers({
    checkedInCount: function() {
        return Recipients.find({ gifts: { $elemMatch: { checkedIn: true }}}).count();
    },
    notCheckedInCount: function() {
        return Recipients.find({ gifts: { $elemMatch: { checkedIn: { $ne: true }}}}).count();
    },
});
