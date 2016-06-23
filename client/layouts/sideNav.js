Template.sideNav.events({
    'click .sidebar'() {
        console.log('Clicked Menu Icon');
        $("#sideMenu")
            .sidebar('overlay')
            .sidebar('toggle')
        ;
    },
    'click #sideMenu .item .icon' (event) {
        event.preventDefault();

        var clickedTarget = event.target.id;
        console.log("User clicked: " + clickedTarget);
        FlowRouter.go('/' + clickedTarget);
    },
});
