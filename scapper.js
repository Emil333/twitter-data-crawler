const CREDS = require('./creds');
const puppeteer = require('puppeteer');
const USERNAME_SELECTOR = '#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(2) > input';
const PASSWORD_SELECTOR = '#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(3) > input';
const BUTTON_SELECTOR = '#page-container > div > div.signin-wrapper > form > div.clearfix > button';
const twitterId = 'satyanadella'
const influencerPageUrl = `https://twitter.com/${twitterId}`;
const TWEET_POST_SELECTOR = '#stream-item-tweet-1062421314152030209 > div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.original-tweet.js-original-tweet.favorited.has-cards.cards-forward'

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
const firstRetweet = 0;
const secondRetweet = 0;
 let tweetPost = await page.evaluate((sel) => {
        const fullTweet = document.querySelector(sel);
        const text = fullTweet.querySelector('.js-tweet-text-container').innerText;
        const commentCount = fullTweet.querySelector('.ProfileTweet-actionCountForPresentation').innerText;
        const retweet = fullTweet.querySelectorAll('.ProfileTweet-actionCountForPresentation');
        firstRetweet = retweet[0].innerText;
        secondRetweet = retweet[1].innerText;
        // const retweetCount = retweet.querySelector('.ProfileTweet-actionCountForPresentation').innerText;
        return { text, commentCount, retweet, firstRetweet, secondRetweet};
      }, TWEET_POST_SELECTOR);
 console.log('post ->', tweetPost)




browser.close();
}

run();

const CREDS = require('./creds');
const puppeteer = require('puppeteer');
const USERNAME_SELECTOR = '#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(2) > input';
const PASSWORD_SELECTOR = '#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(3) > input';
const BUTTON_SELECTOR = '#page-container > div > div.signin-wrapper > form > div.clearfix > button';
const twitterId = 'satyanadella'
const influencerPageUrl = `https://twitter.com/${twitterId}`;
const TWEET_POST_SELECTOR = '#stream-item-tweet-1062421314152030209 > div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.original-tweet.js-original-tweet.favorited.has-cards.cards-forward'

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
const firstRetweet = 0;
const secondRetweet = 0;
 let tweetPost = await page.evaluate((sel) => {
        const fullTweet = document.querySelector(sel);
        const text = fullTweet.querySelector('.js-tweet-text-container').innerText;
        const commentCount = fullTweet.querySelector('.ProfileTweet-actionCountForPresentation').innerText;
        const retweet = fullTweet.querySelectorAll('.ProfileTweet-actionCountForPresentation');
        firstRetweet = retweet[0].innerText;
        secondRetweet = retweet[1].innerText;
        // const retweetCount = retweet.querySelector('.ProfileTweet-actionCountForPresentation').innerText;
        return { text, commentCount, retweet, firstRetweet, secondRetweet};
      }, TWEET_POST_SELECTOR);
 console.log('post ->', tweetPost)




browser.close();
}

run();

