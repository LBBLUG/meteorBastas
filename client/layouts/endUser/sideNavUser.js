Template.sideNavUser.events({
    'click #homeMenu'() {
        event.preventDefault();
        var clickedTarget = event.target.id;
        console.log("User clicked: " + clickedTarget);
        FlowRouter.go('/' + clickedTarget);
    },
});

Template.sideNavUser.onRendered(function() {
    $(".button-collapse").sideNav();
});
