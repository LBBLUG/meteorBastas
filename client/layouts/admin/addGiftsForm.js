Template.addGiftsForm.events({
    'click #submitAddGifts' (event) {
        event.preventDefault();

        // get the values from the gifts form
        var giftType = $("#giftType").val();
        var giftSize = $("#giftSize").val();

        // get selected state
        if($("#selected").prop('checked') == true){
            var selected = 'true';
        } else {
            var selected = 'false';
        }

        // get checkedIn state
        if($("#checkedIn").prop('checked') == true){
            var checkedIn = 'true';
        } else {
            var checkedIn = 'false';
        }

        // get outForDelivery state
        if($("#outForDelivery").prop('checked') == true){
            var outForDelivery = 'true';
        } else {
            var outForDelivery = 'false';
        }

        // get delivered state
        if($("#delivered").prop('checked') == true){
            var delivered = 'true';
        } else {
            var delivered = 'false';
        }

        var deliveryPerson = $("#deliveryPerson").val();
        var deliveryPhone = $("#deliveryPhone").val();
        // console.log("Recipients ID: " + recipientsId);

        // update the recipient record with the gift information
        Meteor.call('gifts.add', recipientsId, giftType, giftSize, selected, checkedIn, outForDelivery, delivered, deliveryPerson, deliveryPhone, function(error, result){
            if (error) {
                console.log('Error: ' + error);
            } else {
                // clear the fields for the next entry
                document.getElementById("addGiftsFormTop").reset();
            }
        });
    },
    'click #cancelAddGifts' (event) {
        event.preventDefault();
        var myGiftsModal = document.getElementById("addGiftsFormView");
        myGiftsModal.style.display = "none";
        document.getElementById("addRecipientsForm").reset();
    },
    'click #closeGiftsModal' (event) {
        event.preventDefault();
        var myGiftsModal = document.getElementById("addGiftsFormView");
        myGiftsModal.style.display = "none";
    }
});
