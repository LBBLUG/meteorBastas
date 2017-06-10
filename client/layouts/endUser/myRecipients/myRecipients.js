import { Recipients } from '../../../../imports/api/recipients.js';

Template.myRecipients.onCreated(function() {
    this.subscribe('getMyRecipients');
});

Template.myRecipients.onRendered(function() {

});

Template.myRecipients.helpers({
    areMyRecipients: function() {
        Recipients.find({});
    },
});
