Template.addGiftsForm.events({
    'click #submitAddGifts' (event) {
        event.preventDefault();

        // get the values from the gifts form
        var giftType = $("#giftType").val();
        var giftSize = $("#giftSize").val();
        var selected = $("#selected").val();
        var checkedIn = $("#checkedIn").val();
        var outForDelivery = $("#outForDelivery").val();
        var delivered = $("#delivered").val();
        var deliveryPerson = $("#deliveryPerson").val();
        var deliveryPhone = $("#deliveryPhone").val();
        console.log("Recipients ID: " + recipientsId);
        // update the recipient record with the gift information

    },
    'click #cancelAddGifts' (event) {
        event.preventDefault();
        var myGiftsModal = document.getElementById("addGiftsFormView");
        myGiftsModal.style.display = "none";
    },
    'click #closeGiftsModal' (event) {
        event.preventDefault();
        var myGiftsModal = document.getElementById("addGiftsFormView");
        myGiftsModal.style.display = "none";
    }
});
