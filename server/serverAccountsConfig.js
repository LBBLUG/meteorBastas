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

var postSignUp = function(userId, info) {
    if (Meteor.users.find().count() > 1) {
        Roles.addUsersToRoles(userId, 'Giver');
    } else if (Meteor.users.find().count() === 1){
        Roles.addUsersToRoles(userId, 'Admin');
    }
};

var onLogOut = function() {
    FlowRouter.go('/user/home');
};

AccountsTemplates.configure({
    postSignUpHook: postSignUp,
    onLogoutHook: onLogOut,
    sendVerificationEmail: true,
});

Accounts.emailTemplates.from = 'no-reply@LubbockLug.org';
Accounts.emailTemplates.siteName = 'Lubbock Be A Santa To A Senior';

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return 'Confirm Your Email Address Please';
    },
    text(user, url) {
        let emailAddress = user.emails[0].address,
          urlWithoutHash = url.replace('#/', ''),
          supportEmail = "no-reply@LubbockLUG.org",
          emailBody = "Thank you for signing up to be a giver with the Lubbock Be A Santa To A Senior program this year.\n\n You signed up with " + emailAddress + " . Please confirm your email address.\n\n We will not enroll you in any mailing lists, nor will we ever share you email address or personal information for any reason.\n\n You can confirm you address by clicking the following link: \n\n " + urlWithoutHash

        return emailBody;
    },
}
