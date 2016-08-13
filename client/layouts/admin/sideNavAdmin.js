Template.sideNavAdmin.events({
    'click .sidebar'() {
        console.log('Clicked Menu Icon');
        $("#sideMenu")
            .sidebar('overlay')
            .sidebar('toggle')
        ;
    },
    'click  #sideMenu' (event) {
        event.preventDefault();

        // TODO when a menu item is clicked, get the id of the
        // item and route to that id.
        // i hate this right now, because the div id is
        // picked up, but the click directly on the Icon
        // doesn't give an id unless I set it the same.
        // I've tried several things to get the parent node
        // id with no luck so far.
        var clickedTarget = event.target.id;
        console.log("User clicked: " + clickedTarget);
        FlowRouter.go('/' + clickedTarget);
    },
});
