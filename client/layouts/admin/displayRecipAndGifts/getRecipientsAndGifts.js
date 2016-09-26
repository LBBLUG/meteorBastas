/*
BASTAS created in Meteor.  The BASTAS (Be A Santa To A Senior) application
gives operators of this program the ability to track gifts selected onlie,
gifts checked in by volunteers giving to a Senior, and delivery of the gifts
to the recipients each season.

Copyright (C) 2016  Brian McGonagill - On Behalf of the Lubbock Linux Users Group

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
        var $rows = $('#table tr.trMainData');
        $('#search').keyup(function() {
            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

            $rows.show().filter(function() {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });
    },
    'input .searchCol' (event) {
        // determine which search column is being used
        var colId = event.currentTarget.id;

        // set the column number i for the column to look in
        switch(colId) {
            case "searchCol1":
                i = 0;
                break;
            case "searchCol2":
                i = 1;
                break;
            case "searchCol3":
                i = 2;
                console.log("Col 3 used");
                break;
            case "searchCol4":
                i = 3;
                break;
            case "searchCol5":
                i = 4;
                break;
            case "searchCol6":
                i = 5;
                break;
        }

        // Check the value entered into the column search field and filter.
        // currently only matches from beginning to end - no middle matching yet.
        $('table tr.trMainData').each(function() {
            var colData = $.trim($(this).find('td').eq(i).text()).replace(/\s+/g, ' ').toLowerCase();
            var typed = $('#' + colId).val().replace(/ +/g, ' ').toLowerCase();
            if (colData.indexOf(typed) < 0) {
                $(this).hide();
            }

            // if the field is being emptied, then show all rows again.
            if ($('#' + colId).val() == null || $('#' + colId).val() == '') {
                $('table tr.trMainData:hidden').show();
            }
        });
    },
    'click .checkFilter' (event) {
        // console.log('checked or unchecked');
        var colId = event.currentTarget.id;
        var state = event.currentTarget.checked;
        console.log('State of ' + colId + ' is now ' + state);
        console.log('Unchecked Count: ' + $('input:checkbox.isSelected:not(:checked)').length);
        console.log('Checked Count: ' + $('input:checkbox.isSelected:checked').length);

        if (state === true) {
            switch(colId) {
                case "selectedFilter":
                    $('input:checkbox.isSelected:not(:checked)').closest('.trMainData').hide();
                    $('input:checkbox.isSelected:checked:hidden').closest('.trMainData').show();
                    break;
                case "selectedFilterUnchecked":
                    $('input:checkbox.isSelected:checked').closest('.trMainData').hide();
                    $('input:checkbox.isSelected:not(:checked):hidden').closest('.trMainData').show();
                    break;
                case "checkedInFilter":
                    $('input:checkbox.isCheckedIn:not(:checked)').closest('.trMainData').hide();
                    $('input:checkbox.isCheckedIn:checked:hidden').closest('.trMainData').show();
                    break;
                case "checkedInFilterUnchecked":
                    $('input:checkbox.isCheckedIn:checked').closest('.trMainData').hide();
                    $('input:checkbox.isCheckedIn:not(:checked):hidden').closest('.trMainData').show();
                    break;
                case "outForDeliveryFilter":
                    $('input:checkbox.isOutForDelivery:not(:checked)').closest('.trMainData').hide();
                    $('input:checkbox.isOutForDelivery:checked:hidden').closest('.trMainData').show();
                    break;
                case "outForDeliveryFilterUnchecked":
                    $('input:checkbox.isOutForDelivery:checked').closest('.trMainData').hide();
                    $('input:checkbox.isOutForDelivery:not(:checked):hidden').closest('.trMainData').show();
                    break;
            }
        } else if (state === false) {
            $('table tr.trMainData:hidden').show();
        }



    },
});

// getDetails when button clicked for a row
Template.getRecipientsAndGift.events({
    'click .details' (event, target) {
        Session.set( "recipientId", this._id );
        console.log("Details clicked: " + this._id);
        var recipientDetailModal = document.getElementById("detailsFormView");
        recipientDetailModal.style.display = "block";
    },
});
