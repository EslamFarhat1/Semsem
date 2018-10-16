//make sure dom is ready and run
$(function () {
    // it's the RSS Feeds case which tests the feeds 
    describe('RSS Feeds', function () {


        // specify wheather allfeeds is defined and not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  a test that loops through each feed
           in the allFeeds object and ensures it has a URL defined
          and that the URL is not empty.
         */
        //make sure all url are defined and not empty
        it('URL are Defined', function () {
            allFeeds.forEach(function(feed){
            	expect(feed.url).toBeDefined();
            	expect(feed.url.length).not.toBe(0);
            });
        });

        // specify wheather allfeeds have the url and not empty
        it('name to be defined', function () {
        	allFeeds.forEach(function(feed){
            	expect(feed.name).toBeDefined();
            	expect(feed.name.length).not.toBe(0);
            });
           
        });
    });


    //calling the second test case and test the menu 
    describe("the menu", function () {


        /*
        find the class 'menu-hidden' in the body if founded
          then the menu is hidden 
        */
        it('the menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        // make toggles on click  to make  the menu appears or disappears
        it('changes visibility on click', function () {

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //calling thrid feed intial entries that ensures when the loadFeed function is called and completes its work
    describe('Initial Entries', function () {
        // calling a function to do an asynchronous request 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // Tests if the loadFeed function has at least the element
        it('feed container has atleast 0 entry', function () {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });
    // calling the suite  that make sure the new feed is loaded 
    describe('New Feed Selection', function () {

        var start, end;

        // make sure that the new feed selection is loaded 
        beforeEach(function (done) {
            //keep the normal content
            loadFeed(0, function () {
                start = $('.feed').children().text();
                // load feed and get the new
                loadFeed(1, function () {

                    end = $('.feed').children().text();
                    done();
                });
            });

        });
        // test to see if two entries are not equal
        it('new feed is different', function () {
            expect(end).not.toBe(start);
        });

    });
}());
