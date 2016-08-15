Template.missingDataModal.events({
    'click #OKMissingData' (event) {
        event.preventDefault();
        var myModal = document.getElementById("missingDataModalView");
        myModal.style.display = "none";
    },
    'click #closeModalCheckmark' (event) {
        event.preventDefault();
        var myModal = document.getElementById("missingDataModalView");
        myModal.style.display = "none";
    },
});
