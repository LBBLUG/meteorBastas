import { Recipients } from '../../../imports/api/recipients.js';

Template.displayRecipAndGifts.helpers({
    getRecipientsAndGifts() {
        return Recipients.find({});
    },
});
