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

Template.importRecipients.events({
    'click #addImportFile' (event) {
            event.preventDefault();

            var data = [];
            // first check to see if the user has selected a file
            var recipientFile = document.getElementById("recipientFile").files[0];
            if (recipientFile == "" || recipientFile == null) {
                myModalTitle = "No File Selected";
                myModalText = "You must select a file to be uploaded and imported.";
                var myModal = document.getElementById("missingDataModalView");
                myModal.style.display = "block";
                $("#myModalTitleHeader").html(myModalTitle);
                $("#myModalTextSection").html(myModalText);
            } else {
                // handle the file selected, and import the Data
                Papa.parse(recipientFile, {
                    delimiter: ",",
                	header: true,
                    dynamicTyping: false,
                    complete: function(results) {
                        data = results;
                        console.dir(data);
                        Meteor.call('Recipients.import', data, function(err, results){
                            if (err) {
                                console.log('Error: ' + err);
                                Session.set("snackbarText", "Error adding banner!");
                                Session.set("snackbarColor", "red");
                                showSnackbar();
                            } else {
                                console.log('Insert Result: ' + results);
                                // add snackbar notice that save was good.
                                Session.set("snackbarText", "Banner added successfully!");
                                Session.set("snackbarColor", "green");
                                showSnackbar();
                                document.getElementById("mainBannerSetup").reset();
                            }
                        });
                    },
                });
            }
    },
});
