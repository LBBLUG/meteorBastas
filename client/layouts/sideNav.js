Template.sideNav.events({
    'click .sidebar'() {
        console.log('Clicked Menu Icon');
        $("#sideMenu").sidebar('show');
    },
    'click .sideMenu.item'() {
        // event.preventDefault();

        var clickedTarget = event.target.id;
        console.log("User clicked: " + clickedTarget);
        FlowRouter.go('/' + clickedTarget);
    },
});
