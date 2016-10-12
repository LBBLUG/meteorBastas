Template.manageUsers.onCreated(function() {
    this.autorun(() => {
        this.subscribe('allUsers');
    });
});

Template.manageUsers.helpers({
    users: function(){
        return Meteor.users.find({});
    },
    userEmail: function() {
        return this.emails[0].address;
    },
    isAdmin: function() {
        return Roles.userIsInRole(this._id, 'Admin', 'Admin') ? 'Admin' : '';
    },
});
