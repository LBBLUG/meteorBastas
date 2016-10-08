Template.setupNav.events({
    'click #btnSetupPageBanner': () => {
        FlowRouter.go('/admin/setupPageBanner');
    },
    'click #btnSetupPageContent': () => {
        FlowRouter.go('/admin/settings');
    },
});
