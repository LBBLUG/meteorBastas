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

Template.sideNavAdmin.events({
    'click  .adminMenu' (event) {
        event.preventDefault();
        var clickedTarget = event.target.id;
        console.log("User clicked: " + clickedTarget);
        if (clickedTarget === 'home' || clickedTarget === 'giveAGift') {
            FlowRouter.go('/user/' + clickedTarget);
        } else if (clickedTarget !== "signIn" && clickedTarget !== "signOut") {
            FlowRouter.go('/admin/' + clickedTarget);
        }
    },
    'click #signIn': () => {
        var signInModal = document.getElementById('signInModal');
        signInModal.style.display = "block";
    },
    'click #signOut': () => {
        Meteor.logout();
    },
});

Template.sideNavAdmin.onRendered(function() {
    // Initialize collapse button
  $(".button-collapse").sideNav({
     closeOnClick: true,
  });

});
