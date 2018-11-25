# twitter-data-crawler
A node.js script on top of Puppetear framework to crawl Twitter insights(Posts, timestamp, likes, retweets, post_id).

# How to run:
# PreRequisites : Node

1)make a directory "twitter_crawler"
  - $ mkdir twitter_crawler
  - $ cd twitter_crawler
  
2)Initiate NPN. put in the necessary details
  - $ npn init
 
3)Install Puppeteer
  - $ npm i --save puppeteer
  
4)edit the creds.js file to include your twitter account credentials

5)Change index.js file "twitterId" field to the twitter Id of the account which you want to crawl

6)go to command line and execute the command
  - $ node index.js
