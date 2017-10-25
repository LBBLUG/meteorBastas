Template.adminHeader.events({
    'click .signInReg' (event) {
        event.preventDefault();
        var signInModal = document.getElementById('signInModal');
        signInModal.style.display = "block";
    }
});
