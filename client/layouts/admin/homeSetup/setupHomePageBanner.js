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

Template.setupHomePageBanner.events({
    'click #btnSubmitBannerSetup' (event) {
        event.preventDefault();
        if ($(".isCurrent").prop('checked') == true) {
            isCurrent = true;
        } else {
            isCurrent = false;
        }

        bannerImage = Session.get("bannerImage");

        Meteor.call('homePageBanner.insert', bannerImage, isCurrent, function(err, result){
            if (err) {
                Session.set("snackbarText", "Error adding banner!");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                // add snackbar notice that save was good.
                Session.set("snackbarText", "Banner added successfully!");
                Session.set("snackbarColor", "green");
                showSnackbar();
                document.getElementById("mainBannerSetup").reset();
                var preview = document.querySelector('img');
                preview.src = "";
            }
        });
    },
    'click #btnCancelBannerSetup' (event) {
        document.getElementById("mainBannerSetup").reset();
    },
    'change #bannerImage': () => {
        var preview = document.querySelector('img');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
            Session.set("bannerImage", preview.src);
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
    },
})
