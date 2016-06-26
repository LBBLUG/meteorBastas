Template.addGiftsModal.events({
    'click #cancelAddGifts' (event) {
        event.preventDefault();
        document.getElementById("addGiftsForm").reset();
    },
});
