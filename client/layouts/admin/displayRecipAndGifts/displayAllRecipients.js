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

Template.displayAllRecipients.helpers({
    findAllRecipients() {
        return Recipients.find({});
    },
});

Template.displayAllRecipients.events({
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

Template.displayAllGifts.events({
    'click .details' (event, target) {
         if (Roles.userIsInRole(Meteor.userId(), ['Admin', 'Editor'])) {
             Session.set( "recipientId", this._id );
             console.log("Details clicked: " + this._id);
             var recipientDetailModal = document.getElementById("detailsFormView");
             recipientDetailModal.style.display = "block";
         } else {
             myModalTitle = "Not Authorized";
             myModalText = "It appears you are not authorized to view detailed information about recipients.  If you believe this to be in error, please contact your system administrator.";
             myModal.style.display = "block";
             $("#myModalTitleHeader").html(myModalTitle);
             $("#myModalTextSection").html(myModalText);
         }
     },
});
