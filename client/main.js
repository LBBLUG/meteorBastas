import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('recipients');
});
