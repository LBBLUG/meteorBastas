import { Recipients } from '../imports/api/recipients.js';

Meteor.publish("recipients", function(){
    return Recipients.find({});
});
