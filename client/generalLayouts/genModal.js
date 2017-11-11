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

Template.genModal.events({
    'click #OKMissingData' (event) {
        event.preventDefault();
        var myModal = document.getElementById("myModal");
        var action = Session.get("actionToTake");
        if (action = "deleteUser") {
            var recipientId = Session.get("recipientId");
            Meteor.call('deleteRecipient', recipientId, function(err, result) {
                if (err) {
                    // // console.log('Something happened');
                    Session.set("snackbarText", "An error occurred deleting the recipient.");
                    Session.set("snackbarColor", "red");
                    showSnackbar();
                } else {
                    // hide the modal
                    var myModal = document.getElementById("myModal");
                    myModal.style.display = "none";
                    // // console.log("Should have a green notification");

                    // show the notification bar
                    Session.set("snackbarText", "Recipient and gifts deleted!");
                    Session.set("snackbarColor", "green");
                    showSnackbar();
                }
            });
        } else {
            var myModal = document.getElementById("myModal");
            myModal.style.display = "none";
        }
    },
});
