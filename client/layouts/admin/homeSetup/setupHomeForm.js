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

import { HomePageData } from '../../../../imports/api/homePageData.js';

Template.homeBody.helpers({
    getHomeDatas: function() {
        return HomePageData.find({ isCurrent: true })
    },
});

Template.setupHomeForm.events({
    'click #btnSubmitHomeSetup' (event) {
        event.preventDefault();
        console.log('Save button Clicked');
        homePageText = $("#mainHomeInfo").val();
        if ($(".isCurrent").prop('checked') == true) {
            isCurrent = true;
        } else {
            isCurrent = false;
        }

        image64 = Session.get("encodedImage");

        Meteor.call('homePageData.insert', homePageText, image64, isCurrent, function(err, result){
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Insert Result: ' + result);
                document.getElementById("mainHomeSetup").reset();
            }
        });
    },
    'change #homeImage' (event) {
      var preview = document.querySelector('img');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
        Session.set("encodedImage", preview.src);
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
});

Template.imageDisplay.helpers({
    niceImage: function() {
        reader = new FileReader();
        return reader.readAsDataURL(imageFileEncoded);
    }
});
