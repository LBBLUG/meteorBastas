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
                        Meteor.call('Recipients.import', data);
                    },
                });
            }
    },
});
