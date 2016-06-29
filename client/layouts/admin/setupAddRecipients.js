Template.setupAddRecipients.events({
    'click #submitAddRecipient' (event) {
        event.preventDefault();

        var bastasId = $("#bastasId").val();
        conssole.log("Bastas ID: " + bastasId);

        $('.ui.modal').modal('show');
    },
    'click #cancelAddRecipient' (event) {
        event.preventDefault();
        document.getElementById("addRecipientsForm").reset();
    }
});
