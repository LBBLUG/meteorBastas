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

import { Meteor } from 'meteor/meteor';
import { MessagingSettings } from '../imports/api/messagingSettings.js';

Meteor.startup(() => {
    // code to run on server at startup
    try {
        let msgSettings = MessagingSettings.findOne({ active: true });
        if (typeof msgSettings == 'undefined' || msgSettings == null || msgSettings == "") {
          // msg settings not set, route user to setup for message settings.
          // console.log("Didn't find email settings.");
        } else {
            // console.log("Found email settings");
            let user = msgSettings.emailUser;
            // console.log("User = " + user);
            Meteor.call('setEmailFromServer', msgSettings);
        }
    } catch (error) {
        console.log("Error caught in server/main.js: " + error);
    }

 });

 Meteor.methods({
     'setEmailFromServer' (msgSettings) {
         if (msgSettings) {
             smtp = {
                 username: msgSettings.emailUser,
                 password: msgSettings.emailPasswd,
                 server: msgSettings.smtpSrvUrl,
                 port: msgSettings.smtpPort
             }

             process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
         }
     },
 });
