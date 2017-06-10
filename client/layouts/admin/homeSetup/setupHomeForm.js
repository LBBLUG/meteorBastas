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
import { HomePageBanner } from '../../../../imports/api/homePageBanner.js';

Meteor.subscribe('homePageData');
Meteor.subscribe('homePageBanner');

Template.setupHomeForm.events({
    'click #btnSubmitHomeSetup' (event) {
        event.preventDefault();
        homePageText = $("#mainHomeInfo").val();
        if ($(".isCurrent").prop('checked') == true) {
            isCurrent = true;
        } else {
            isCurrent = false;
        }

        image64 = Session.get("encodedImage");

        Meteor.call('homePageData.insert', homePageText, image64, isCurrent, function(err, result){
            if (err) {
                Session.set("snackbarText", "Error adding Homepage Info!");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Session.set("snackbarText", "Homepage info added successfully!");
                Session.set("snackbarColor", "green");
                showSnackbar();
                document.getElementById("mainHomeSetup").reset();
                var preview = document.querySelector('img');
                preview.src = "";
            }
        });
    },
    'click #btnCancelHomeSetup' (event) {
        document.getElementById("mainHomeSetup").reset();
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
    },
    'click .editHomePageShow' (event) {
        event.preventDefault();
        // console.log("clicked to edit.");
        var editHomePageModal = document.getElementById('editHomePageModal');
        editHomePageModal.style.display = "block";
    },
});

Template.editHomePageData.helpers({
    showHomeData: function() {
        return HomePageData.find({});
    },
    currentInfo: function() {
        if (this.isCurrent === true) {
            return "checked";
        } else {
            return false;
        }
    },
});

Template.editHomePageData.events({
    'click .editHomePageInfo' (event) {
        event.preventDefault();
        var clickedId = event.currentTarget.id;
        indexNo = clickedId.slice(-1);

        $(".editHomePageInfo").closest('tr').prop('contenteditable', true);
        $(".editHomePageInfo").hide();
        $(".deleteHomePageInfo").hide();
        $(".saveHomePageInfoTable").css('visibility', 'visible');
        $(".cancelHomePageInfoTable").css('visibility', 'visible');
    },
    'click .deleteHomePageInfo' (event) {
        event.preventDefault();
        var infoId = this._id;
        // console.log("i would delete: " + infoId);
        Meteor.call('homePageData.delete', this._id);
    },
    'click .cancelHomePageInfoTable' (event) {
        event.preventDefault();
        $(".cancelHomePageInfoTable").closest('tr').prop('contenteditable', false);
        $(".editHomePageInfo").show();
        $(".deleteHomePageInfo").show();
        $(".saveHomePageInfoTable").css('visibility', 'hidden');
        $(".cancelHomePageInfoTable").css('visibility', 'hidden');
    },
    'click .saveHomePageInfoTable' (event) {
        event.preventDefault();
        var clickedId = event.currentTarget.id;
        var indexNo = clickedId.slice(-1);
        var infoId = this._id;

        $(".saveHomePageInfoTable").closest('tr').prop('contenteditable', false);
        $(".editHomePageInfo").show();
        $(".deleteHomePageInfo").show();
        $(".saveHomePageInfoTable").css('visibility', 'hidden');
        $(".cancelHomePageInfoTable").css('visibility', 'hidden');

        // and save some stuff.
        var newInfo = $("#infoTextCell" + indexNo).text();
        // console.log("new info from save: " + newInfo);
        $("#infoTextCell" + indexNo).text('');

        Meteor.call('homePageData.update', infoId, newInfo, function(err, result){
            if (err) {
                Session.set("snackbarText", "Error: Info not Updated!");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {

                Session.set("snackbarText", "Info Updated Successfully!");
                Session.set("snackbarColor", "green");
                showSnackbar();
            }
        });
    },
    'click .currentInfo' (event) {
        event.preventDefault();
        const setCurrent = event.currentTarget.checked;
        itemId = this._id;

        Meteor.call('update.setCurrent', itemId, setCurrent, function(err, result) {
            if (err) {
                Session.set("snackbarText", "An error occurred updating Current Status");
                Session.set("snackbarColor", "red");
                showSnackbar();
            } else {
                Session.set("snackbarText", "Updated Successfully!");
                Session.set("snackbarColor", "green");
                showSnackbar();
            }
        });
    },
    'click .doneEditHomeInfo' (event) {
        event.preventDefault();

        var editHomePageModal = document.getElementById('editHomePageModal');
        editHomePageModal.style.display = "none";
    },
});
