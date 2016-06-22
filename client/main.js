import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Template.HomeLayout.events({
    'click .sidebar'() {
        console.log('Clicked Menu Icon');
        $("#sideMenu").sidebar('show');
    },
    'click #buttontry' (event){
        console.log('Tried and Done');
    },
});
