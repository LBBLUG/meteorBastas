import { Recipients } from '../../../../imports/api/recipients.js';

Template.displayRecipAndGifts.helpers({
    getRecipientsAndGifts() {
        return Recipients.find({});
    },
});

Template.displayRecipAndGifts.events({
    'input .textSearch' (event, target) {
        var $rows = $('#table tr');
        $('#search').keyup(function() {
            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

            $rows.show().filter(function() {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });
    },
});

Template.getRecipientsAndGift.events({
    'click .details' (event, target) {
        console.log("Details clicked: " + this._id);
    },
    'click .isCheckedIn' (event, target) {
        console.log("Checked In clicked: " + this._id);
    },
});
