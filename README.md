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

    1. get meteor and install it on your intended server.
        https://www.meteor.com/
    2. install git if you don't already have it.  
        https://git-scm.com/downloads
    2. clone the repository.
        git clone https://github.com/LBBLUG/meteorBastas.git
    3. change into the directory created.
        cd meteorBastas
    4. type 'meteor' into the terminal window while in that directory.
    5. use http://localhost:3000 to reach the main page.
    
## Install packages for Backup through UI

If you want to use the backup feature, you'll also need to install ShellJS from NPM, as well as make sure that Mongo is installed from mongodb.com.

The only reason you need Mongo outside of the Mongo instance installed with meteor is so teh mongodump backup command will work.

    1. In the meteorBastas directory created from the initial Git Clone, run the command `meteor npm install shelljs --save` in a terminal.
    2. Make sure to install MongoDB for your OS and architecture from Mongodb.com.
    
If you get prompated after the mpn install of ShellJS to run another npm command to install stubs dependencies, go ahead and run that.

Now kill and re-run the meteor command, and everything should work.

## Features now working


- Recipients List now shows recipients and their selected gifts.
- Find Recipients is a quick find of Recipient / gift info.  
    - Gift status can be easily updated in this view.
- Detail View (reached from Recipients List or Find Recipients).
- Recipients Import from .csv file
- Adding Recipients and Gifts manually
- Adding content Text and Images for the home page
- Adding a banner image for the home page.
- Displaying the Home page
- User account administration for changing user role / permissions

### Uploading a .csv file for bulk import

I have completed the work to upload a csv file in bulk.  There are some rules for uploading a CSV.

    1. there cannot be any commas ',' in the fields within the CSV.  
    2. the header rows for the columns must be titled exactly as follows with capitalization as shown, the order of the columns is not important as long as the data in the column matches the column header row.
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
        j. giftType3
        k. giftSize3

        * Note:  If any person has more than 2 gifts, you must have a full column for giftType3 and giftSize3.   At this time, the system cannot do more than 3 gifts due to parser limitations.  I will look into other options at a later time.

    with respect to addresses
        j. streetAddress
        i. aptNo (apartment number)
        j. complexName (apartment complex name)
        k. zip

    with respect to phone numbers
        l. home
        m. cell

    the above columns do not have to be in any particular order, but the header row for each must be labeled as described above.

    Additional columns can be added with header labels of
        a. notes
        b. city
        c. state


## Next up development

    1. Fix bugs, start adding features for givers.
    2. Add ability to delete from Find Recipients or Recipients list
        a. Add a double check before delete.
    3. Backup Database with button click.
