Template.missingDataModal.events({
    'click #OKMissingData' (event) {
        event.preventDefault();
        var myModal = document.getElementById("missingDataModalView");
        myModal.style.display = "none";
    },
    'click #closeModalX' (event) {
        event.preventDefault();
        var myModal = document.getElementById("missingDataModalView");
        myModal.style.display = "none";
    },
});
