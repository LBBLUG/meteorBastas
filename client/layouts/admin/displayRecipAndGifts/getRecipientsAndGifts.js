import { Recipients } from '../../../../imports/api/recipients.js';

// get the information from the mongoDB collection Recipients
Template.displayRecipAndGifts.helpers({
    getRecipientsAndGifts() {
        return Recipients.find({});
    },
});

// use the textBox at the top to search for items in the grid as use types
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

// getDetails when button clicked for a row
Template.getRecipientsAndGift.events({
    'click .details' (event, target) {
        console.log("Details clicked: " + this._id);
        var recipientDetailModal = document.getElementById("detailsFormView");
        myGiftsModal.style.display = "block";
        // FlowRouter.go('recipientDetail');
    },
});
