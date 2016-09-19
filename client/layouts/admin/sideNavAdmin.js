Template.sideNavAdmin.events({
    'click  #adminMenu' (event) {
        event.preventDefault();
        var clickedTarget = event.target.id;
        console.log("User clicked: " + clickedTarget);
        FlowRouter.go('/' + clickedTarget);
    },
});

Template.sideNavAdmin.onRendered(function() {
    $(".button-collapse").sideNav();
});
