Meteor BASTAS is the Be a Santa To A Senior project done in Meteor.

I chose Meteor for a few reasons:

    1. As a non-developer it's pretty easy to grasp the concepts of meteor.
    2. Setting up Meteor for the end user wanting to take advantage of this project is as simple as cloning the repo, getting into the directory created, and typing `meteor` into the terminal to start their server.
    3. I like the ability to break the project into small pieces.  When I want to adjust the list of recipients, it's easy to find those parts, and make adjustments vs. having to look through a massive javascript file or html page to make the single adjustment I may want / need.
    4. Meteor has a ton of great libraries that give it some great support.
    5. MongoDB out of the box.
    6. Live updating out of the box.

## Install and start the server

So, as described above, to run this project on your local machine simply do the following:

    1. clone the repository.
    2. change into the directory created.
    3. type 'meteor' into the terminal window while in that directory.
    4. use http://localhost:3000 to reach the main page.

## Features now working

Recipients List now shows recipients and their selected gifts.  Next, I'll be adding actions to show more detail, and / or edit the recipient and gifts.

I have completed the work to upload a csv file in bulk.  There are some rules for uploading a CSV.

    1. there cannot be any commas ',' in the fields withint the CSV.  
    2. the header rows for the columns must be titled exactly as follows with capitalization as shown.
        a. bastasId
        b. route

    with respect to recipients name
        c. first
        d. last
        e. gender

    with respect to gifts
        f. giftType1
        g. giftSize1
        h. giftType2
        i. giftSize2

    with respect to addresses
        j. streetAddress
        i. aptNo
        j. complexName
        k. zip

    with respect to phone numbers
        l. home
        m. cell

    the above columns do not have to be in any particular order, but the header row for each must be labeled as described above.

    Additional rows can be added with header labels of
        a. notes
        b. city
        c. state

    fields with respect to gifts
        a. selected
        b. checkedIn
        c. outForDelivery
        d. delivered
        e. deliveryPerson
        f. deliveryPhone

## Next up development
    1. Get the ability to edit recipients and gifts in the grid (checking the selected, checked in, out for delivery, and delivered check boxes).
    2. Get the ability to move to a detail screen from the grid view.
    3. Make edits in the detail screen.
    4. Roles and Permissions for users.
        a. Make it so the first user created is an admin.
        b. Make screens and methods for setting user permissions.
        c. Make all users after the first user, an 'end user / giver' by default.
    
