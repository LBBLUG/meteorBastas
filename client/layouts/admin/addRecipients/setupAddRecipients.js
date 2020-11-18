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

Template.setupAddRecipients.onRendered(function() {
    $('select').formSelect();
});

Template.setupAddRecipients.events({
    'click #submitAddRecipient' (event) {
        event.preventDefault();

        var bastasId = $("#bastasId").val();
        var route = $("#route").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var gender = $("#gender").val();
        var streetAddress = $("#streetAddress").val();
        var complexName = $("#complexName").val();
        var aptNo = $("#aptNo").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zip = $("#zip").val();
        var homePhone = $("#homePhone").val();
        var cellPhone = $("#cellPhone").val();
        var notes = $("#notes").val();

        if (bastasId == "" || route == "" || firstName == "" || streetAddress == "" || city == "") {
            myModalTitle = "Missing Required Data";
            myModalText = "You have not filled in some required fields.  Please go back to the form, and fill in all required fields, then try to re-submit the form. <br />Required fields are notated with an asterisk (*) next to the field name.";
            var myModal = document.getElementById("missingDataModalView");
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        } else {
            Meteor.call('recipients.insert', bastasId, route, firstName, lastName, gender, streetAddress, complexName, aptNo, city, state, zip, homePhone, cellPhone, notes, function(err, result){
                if (err) {
                    Session.set("snackbarText", "Error Adding Recipient Information!");
                    Session.set("snackbarColor", "red");
                    showSnackbar();
                } else {
                    recipientsId = result;
                    // add snackbar notice that save was good.
                    Session.set("snackbarText", "Recipient Added Successfully!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                    var myGiftsModal = document.getElementById("addGiftsFormView");
                    myGiftsModal.style.display = "block";
                }
            });
        }
    },
    'click #cancelAddRecipient' (event) {
        event.preventDefault();
        document.getElementById("addRecipientsForm").reset();
    }
});
