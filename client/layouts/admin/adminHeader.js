Template.adminHeader.onRendered(function() {
    $('.sidenav').sidenav();
})

Template.adminHeader.events({
    'click .signInReg' (event) {
        event.preventDefault();
        var signInModal = document.getElementById('signInModal');
        signInModal.style.display = "block";
    },
    'click .menu': () => {
        console.log('menu clicked');
        // let menu = document.getElementById("adminMenu")
        // menu.style.width = "300px";
    },
});
