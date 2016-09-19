import { HomePageData } from '../../../../imports/api/homePageData.js';

Template.homeBody.helpers({
    getHomeDatas: function() {
        return HomePageData.find({ isCurrent: true })
    },
});

Template.setupHomeForm.events({
    'click #btnSubmitHomeSetup' (event) {
        event.preventDefault();
        console.log('Save button Clicked');
        homePageText = $("#mainHomeInfo").val();
        if ($(".isCurrent").prop('checked') == true) {
            isCurrent = true;
        } else {
            isCurrent = false;
        }

        image64 = Session.get("encodedImage");

        Meteor.call('homePageData.insert', homePageText, image64, isCurrent, function(err, result){
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Insert Result: ' + result);
                document.getElementById("mainHomeSetup").reset();
            }
        });
    },
    'change #homeImage' (event) {
      var preview = document.querySelector('img');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
        Session.set("encodedImage", preview.src);
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
});

Template.imageDisplay.helpers({
    niceImage: function() {
        reader = new FileReader();
        return reader.readAsDataURL(imageFileEncoded);
    }
});
