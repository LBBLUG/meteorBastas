import { Recipients } from '../../../imports/api/recipients.js';

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
            var modealInfo = "MissingData";
            $('#missingDataModalView').modal('show');
            $("#msgToUser").html("You are missing required information. Please correct the issue, and re-submit.");
        } else {
            Meteor.call('recipients.insert', bastasId, route, firstName, lastName, gender, streetAddress, complexName, aptNo, city, state, zip, homePhone, cellPhone, notes, function(error, result) {
                var recipientId = result;
                console.log("Recipient ID created is: " + recipientId)
            });
            $('#addGiftsModalView').modal('show');
        }


    },
    'click #cancelAddRecipient' (event) {
        event.preventDefault();
        document.getElementById("addRecipientsForm").reset();
    }
});
