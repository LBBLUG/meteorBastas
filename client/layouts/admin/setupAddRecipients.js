Template.setupAddRecipients.events({
    'click #submitAddRecipient' (event) {
        event.preventDefault();
        $('.ui.modal').modal('show');
    },
    'click #cancelAddRecipient' (event) {
        event.preventDefault();
        document.getElementById("addRecipientsForm").reset();
    }
});
