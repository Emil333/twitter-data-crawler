
const CREDS = require('./creds');
const puppeteer = require('puppeteer');
const USERNAME_SELECTOR = '#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(2) > input';
const PASSWORD_SELECTOR = '#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(3) > input';
const BUTTON_SELECTOR = '#page-container > div > div.signin-wrapper > form > div.clearfix > button';
const twitterId = 'FCBarcelona'
const helpers = require('./helpers');
const autoScroll = helpers.autoScroll;
const influencerPageUrl = `https://twitter.com/${twitterId}`;
// var json2csv = require('json2csv');
const json2csv = require('json2csv').parse;
const fs = require('fs');
// const TWEET_POST_SELECTOR = '#stream-item-tweet-1062421314152030209 > div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.original-tweet.js-original-tweet.favorited.has-cards.cards-forward'

async function run() {
  const browser = await puppeteer.launch({
     headless: false
  });

const page = await browser.newPage();
await page.goto('https://twitter.com/login?lang=en');
await page.click(USERNAME_SELECTOR);
await page.keyboard.type(CREDS.username);
await page.click(PASSWORD_SELECTOR);
await page.keyboard.type(CREDS.password);
await page.click(BUTTON_SELECTOR);
await page.waitForNavigation();
await page.goto(influencerPageUrl);
await page.waitFor(2*1000);

await page.setViewport({
            width: 1200,
            height: 800
        });
let ret = [];

await autoScroll(page);

const tweets = await page.evaluate(function() {
            //constant selector for the actual tweets on the screen
            const TWEET_SELECTOR = '.js-stream-tweet';

            //grab the DOM elements for the tweets
            let elements = Array.from(document.querySelectorAll(TWEET_SELECTOR));

            //create an array to return
            let ret = [];

            //get the info from within the tweet DOM elements
            for (var i = 0; i < elements.length; i += 1) {
                //object to store data
                let tweet = {};

                //get text of tweet
                const TWEET_TEXT_SELECTOR = ".tweet-text";
                tweet.text = elements[i].querySelector(TWEET_TEXT_SELECTOR).textContent;

                //get timestamp
                const TWEET_TIMESTAMP_SELECTOR = '.tweet-timestamp';
                tweet.timestamp = elements[i].querySelector(TWEET_TIMESTAMP_SELECTOR).getAttribute('title');

                //get tweet id
                const TWEET_ID_SELECTOR = 'data-tweet-id';
                tweet.id = elements[i].getAttribute(TWEET_ID_SELECTOR);

                //get likes/retweets
                const ACTIONS_SELECTOR = ".ProfileTweet-actionCountForPresentation";
                let actions = elements[i].querySelectorAll(ACTIONS_SELECTOR);

                //loop through the DOM elements for the actions
                for (var j = 0; j < actions.length; j += 1) {
                    //for some reason, retweets are the 2nd action and likes are the 4th
                    tweet.retweets = actions[1].innerHTML ? actions[1].innerHTML : 0;
                    tweet.likes = actions[3].innerHTML ? actions[3].innerHTML : 0;
                }

                //add tweet data to return array
                ret.push(tweet);
            }
            return ret;
        });

        //add to csv
        ret.push(tweets);
        ret = [].concat.apply([], ret);
        // console.log("tweets ->", ret)

        //close the page
        await page.close();
browser.close();

const fields = ['text', 'id', 'retweets', 'likes'];
const csv = json2csv(ret, fields);
// console.log(csv);
  fs.writeFile(`/home/emil/Documents/moves_influencer_score_data/${twitterId}.csv`, csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });

// json2csv({data: ret, fields: ['text', 'id', 'retweets', 'likes']}, function(err, csv) {
//   if (err) console.log(err);
//   fs.writeFile('/home/emil/Documents/file.csv', csv, function(err) {
//     if (err) throw err;
//     console.log('file saved');
//   });
// });

}
run();



