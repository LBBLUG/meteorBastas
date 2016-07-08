import { Recipients } from '../../../imports/api/recipients.js';

Template.displayRecipAndGifts.helpers({
    getRecipientsAndGifts() {
        return Recipients.find({});
    },
});

Template.getRecipientsAndGift.helpers({
    isSelected: function() {
        return Recipients.find({selected: "true"});
    },
});
