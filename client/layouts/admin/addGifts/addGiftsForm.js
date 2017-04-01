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

Template.addGiftsForm.onRendered(function() {
    var giftNo = 0;
    Session.set("giftCount", giftNo);
});

Template.addGiftsForm.events({
    'click #submitAddGifts' (event) {
        event.preventDefault();

        // get the values from the gifts form
        var giftNo = Session.get("giftCount");
        giftNo++;
        Session.set("giftCount", giftNo);
        var giftType = $("#giftType").val();
        var giftSize = $("#giftSize").val();


        // get selected state
        if($("#selected").prop('checked') == true){
            var selected = true;
        } else {
            var selected = false;
        }

        // get checkedIn state
        if($("#checkedIn").prop('checked') == true){
            var checkedIn = true;
        } else {
            var checkedIn = false;
        }

        // get outForDelivery state
        if($("#outForDelivery").prop('checked') == true){
            var outForDelivery = true;
        } else {
            var outForDelivery = false;
        }

        // get delivered state
        if($("#delivered").prop('checked') == true){
            var delivered = true;
        } else {
            var delivered = false;
        }

        var deliveryPerson = $("#deliveryPerson").val();
        var deliveryPhone = $("#deliveryPhone").val();

        // check that the information is filled in for gift
        // type and size before save, and warn the user if not.
        if (giftType === null || giftType === "" || giftSize === null || giftSize === "") {
            myModalTitle = "Missing Required Data";
            myModalText = "You have not filled in some required fields.  Please go back to the form, and fill in all required fields, then try to re-submit the form. <br />Required fields are notated with an asterisk (*) next to the field name.";
            var myModal = document.getElementById("missingDataModalView");
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        } else {
            // update the recipient record with the gift information
            Meteor.call('gifts.add', recipientsId, giftNo, giftType, giftSize, selected, checkedIn, outForDelivery, delivered, deliveryPerson, deliveryPhone, function(err, result){
                if (err) {
                    Session.set("snackbarText", "Error Adding Gift Information!");
                    Session.set("snackbarColor", "red");
                    showSnackbar();
                } else {
                    // add snackbar notice that save was good.
                    Session.set("snackbarText", "Gift Added Successfully!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                    document.getElementById("addGiftsFormTop").reset();
                }
            });
        }
    },
    'click #cancelAddGifts' (event) {
        event.preventDefault();
        var myGiftsModal = document.getElementById("addGiftsFormView");
        myGiftsModal.style.display = "none";
        document.getElementById("addRecipientsForm").reset();
    },
    'click #closeGiftsModal' (event) {
        event.preventDefault();
        var myGiftsModal = document.getElementById("addGiftsFormView");
        myGiftsModal.style.display = "none";
    }
});
