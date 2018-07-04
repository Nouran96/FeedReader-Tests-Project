/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
*/
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        // Detect whether a string is in URL format or not
        // Reference : http://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
        function isValidUrl(str) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(str);
        }

        // For checking if a string is blank, null or undefined
        // Reference: http://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript
        function isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });

        // Checks that the url of each feed is defined, valid and is not empty
        it('have their urls defined', function() {

            // Iterate over each feed
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(isBlank(feed.url)).not.toBe(true);
                expect(isValidUrl(feed.url)).toBe(true);
            });

        });


        // Checks that the name of each feed is defined and is not empty
        it('have their names defined', function () {

            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(isBlank(feed.name)).not.toBe(true);
            });

        });
    });


    // A test suite that checks the visibility of the menu
    describe('The menu', function() {

        // A test to ensure that the menu is hidden by default 
        it('is hidden by default', function() {
            var hidden = document.body.classList.contains('menu-hidden');

            expect(hidden).not.toBeFalsy();
        });

        // A test to ensure that the menu changes visibility when clicked
        it('changes visibility when clicked', function() {
            var menuIcon = document.querySelector('.menu-icon-link');
            var body = document.body;

            // Simulate a click
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBeFalsy();

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).not.toBeFalsy();

        });
    });

    // A new test suite for checking the presence of initial entries
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.*/
        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0);
                done();
            }, 4000);
        });
        
        it('there is at least a single entry in the feeds', function(done) {
            var feedEntries = $('.feed').find('.entry');

            expect(feedEntries.length).toBeGreaterThan(0);
            done();
        });
    });

    /* A test suite to check the loading of different feeds */
    describe('New Feed Selection', function() {
        var oldContent, newContent;

        beforeEach(function (done) {
            // Load the first feed
            loadFeed(0, function() {
                // Store the content of its first entry
                oldContent = document.querySelector('.entry').innerText;
                // Load another feed
                loadFeed(1, function() {
                    // Store the content of its first entry in another variable
                    newContent = document.querySelector('.entry').innerText;
                    done();
                });
            });
        });

        //  Check to see that the content actually changed
        it('Changes content', function(done) {
            expect(oldContent).not.toEqual(newContent);
            done();
        });
    });
}());
