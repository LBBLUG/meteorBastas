/*
BASTAS created in Meteor.  The BASTAS (Be A Santa To A Senior) application
gives operators of this program the ability to track gifts selected onlie,
gifts checked in by volunteers giving to a Senior, and delivery of the gifts
to the recipients each season.

Copyright (C) 2016  Brian McGonagill - On Behalf of the Lubbock Linux Users Group

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

Template.changeUserRole.onRendered( function() {
    $('select').material_select();
});

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
        return Roles.getRolesForUser( this._id );
    },
});

Template.manageUsers.events({
    'click .userIdLink' (event) {
        event.preventDefault();
        Session.set("userIdClicked", this._id);
        if (Roles.userIsInRole(Meteor.userId(), 'Admin')) {
            var changeUserRoleModal = document.getElementById("changeUserRole");
            changeUserRoleModal.style.display = "block";
        } else {
            var myModal = document.getElementById("myModal");
            myModalTitle = "Not Authorized";
            myModalText = "It appears you are not authorized to view detailed information about users.  If you believe this to be in error, please contact your system administrator.";
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        }
    },
});

Template.changeUserRole.helpers({
    getUserInfo: function() {
        var userIdClicked = Session.get("userIdClicked");
        return Meteor.users.find({ _id: userIdClicked });
    },
    userEmail: function() {
        return this.emails[0].address;
    },
    userRoles: function() {
        return Roles.getRolesForUser( this._id );
    },
});

Template.changeUserRole.events({
    'click .closeChangeRole' (event) {
        event.preventDefault();
        var changeUserRoleModal = document.getElementById("changeUserRole");
        changeUserRoleModal.style.display = "none";
    },
    'change .changeRole' (event) {
        event.preventDefault();
        var currRole = Roles.getRolesForUser( this._id );
        var newRole = $("#newUserRole").val();
        if (newRole != currRole) {
            Meteor.call("newRole", this._id, newRole, currRole, function() {
                // console.log("Done!");
                Session.set("snackbarText", "User Role updated successfully!");
                Session.set("snackbarColor", "green");
                showSnackbar();
            });
        } else {
            var myModal = document.getElementById("myModal");
            myModalTitle = "User Already In Role";
            myModalText = "The user is already in the role you are trying to assign.  Please choose a different role, or exit.";
            myModal.style.display = "block";
            $("#myModalTitleHeader").html(myModalTitle);
            $("#myModalTextSection").html(myModalText);
        }
    }
});
