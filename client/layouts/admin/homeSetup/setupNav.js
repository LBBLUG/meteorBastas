Template.setupNav.onRendered(function() {

});

Template.setupNav.events({
    'click .collNav' (event) {
        event.preventDefault();

        let clickedNav = event.currentTarget.id;

        FlowRouter.go('/admin/' + clickedNav);
    }
});
