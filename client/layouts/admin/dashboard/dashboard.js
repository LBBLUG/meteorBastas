import { Recipients } from '../../../../imports/api/recipients.js';

Template.countsWidget.onCreated(function() {
    this.giftCount = new ReactiveVar(0); //define state with reactiveVar
    this.autorun(()=>{
        Meteor.call('get.totalGifts', function(err, result){
            if (err) {
                console.log("Error: " + err);
            } else {
                var count = result[0].count;
                Session.set("totalCount", count); //set state after method return result
            }
        });
        Meteor.call('get.CheckedInCount', function(err, result) {
            if (err) {
                console.log("Error: " + err);
            } else {
                var checkedInCount = result[0].count;
                Session.set("checkedInCount", checkedInCount);
            }
        });

            var total = Session.get("totalCount");
            var checkedIn = Session.get("checkedInCount");
            var percentage = Math.floor((checkedIn / total) * 100);
            console.log("Percent complete = " + percentage);
            gaugeValue = "rotate(" + (percentage / 2) / 100 + "turn)";
            $("#percent").html(percentage + " %");
            $('.gauge-c').css('transform', gaugeValue);
    });
});


Template.countsWidget.helpers({
    CheckedInCount: function() {
        let instance = Template.instance();
        return Session.get("checkedInCount")
    },
    TotalGifts: function() {
        let instance = Template.instance();
        return Session.get("totalCount"); //get state
    },
});
