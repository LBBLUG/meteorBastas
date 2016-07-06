Template.importRecipients.events({
    'click #addImportFile' (event) {
            event.preventDefault();

            // first check to see if the user has selected a file
            var recipientFile = $("#recipientFile").val();
            if (recipientFile == "") {
                myModalTitle = "No File Selected";
                myModalText = "You must select a file to be uploaded and imported.";
                var myModal = document.getElementById("missingDataModalView");
                myModal.style.display = "block";
                $("#myModalTitleHeader").html(myModalTitle);
                $("#myModalTextSection").html(myModalText);
            } else {
                // handle the file selected, and import the Data
                console.log("File selected is: " + recipientFile);
                
            }
    },
});
