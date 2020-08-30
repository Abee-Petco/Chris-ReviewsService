/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const Ipsum = require('lorem-ipsum').LoremIpsum;
const csvWriter = require('csv-write-stream');

const fs = require('fs');

const mapYeses = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 1,
  7: 1,
  8: 2,
  9: 3,
};

const generateYeses = function () {
  const rollYeses = Math.floor(Math.random() * 10);

  return mapYeses[rollYeses];
};

/////////////////////////////////////
//Recommended
/////////////////////////////////////

const generateRecommended = function (score) {
  if (score > 3) {
    return true;
  } else if (score < 3) {
    return false;
  } else {
    return Math.random() < 0.65;
  }
};

/////////////////////////////////////
//ReviewTitle
/////////////////////////////////////
const lorem = new Ipsum({
  sentencesPerParagraph: {
    max: 3,
    min: 1,
  },
  wordsPerSentence: {
    min: 3,
    max: 6,
  },
});

const generateReviewTitle = function () {
  return lorem.generateWords(4);
};

/////////////////////////////////////
//ReviewText
/////////////////////////////////////
const reviewLengthMapping = {
  0: 1,
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 2,
  9: 3,
};

const generateReviewText = function () {
  const numberOfParagraphs = Math.floor(Math.random() * 10);

  return lorem.generateParagraphs(reviewLengthMapping[numberOfParagraphs]);
};

/////////////////////////////////////
//Score
/////////////////////////////////////
const scoreMapping = {
  5: 0.55,
  4: 0.4,
  3: 0.25,
  2: 0.2,
};

const generateScore = function () {
  const roll = Math.random();

  if (roll < scoreMapping['2']) {
    return 1;
  }

  if (roll < scoreMapping['3']) {
    return 2;
  }

  if (roll < scoreMapping['4']) {
    return 3;
  }

  if (roll < scoreMapping['5']) {
    return 4;
  }

  return 5;
};

/////////////////////////////////////
//Date ISO-8601 standard
/////////////////////////////////////

const mapYear = {
  0: '2020',
  1: '2019',
  2: '2018',
};

const mapMonth = {
  2020: [1, 2, 3, 4, 5],
  2019: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  2018: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

const thirtyOneDayMonth = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
const thirtyDayMonth = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];
const twentyEightDayMonth = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
];

const mapDay = {
  1: thirtyOneDayMonth,
  2: twentyEightDayMonth,
  3: thirtyOneDayMonth,
  4: thirtyDayMonth,
  5: thirtyOneDayMonth,
  6: thirtyDayMonth,
  7: thirtyOneDayMonth,
  8: thirtyOneDayMonth,
  9: thirtyDayMonth,
  10: thirtyOneDayMonth,
  11: thirtyDayMonth,
  12: thirtyOneDayMonth,
};

const generateDate = function () {
  // '2020-06-06T22:07:57.603Z' standard
  // '2020-06-06 22:07:57.603' To get accurate moment from user's local time, convert above time stamp to T-less and Z-less format before passing into moment().fromNow()
  const rollYear = Math.floor(Math.random() * 3);
  const year = mapYear[rollYear];

  const rollMonth = Math.floor(Math.random() * mapMonth[year].length);
  let month = mapMonth[year][rollMonth];

  const rollDay = Math.floor(Math.random() * mapDay[month].length);
  let day = mapDay[month][rollDay];

  let rollHour = Math.floor(Math.random() * 24);
  let rollMinute = Math.floor(Math.random() * 60);
  let rollSeconds = Math.floor(Math.random() * 60);

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  if (rollHour < 10) {
    rollHour = `0${rollHour}`;
  }

  if (rollMinute < 10) {
    rollMinute = `0${rollMinute}`;
  }

  if (rollSeconds < 10) {
    rollSeconds = `0${rollSeconds}`;
  }

  const date = `${year}-${month}-${day}T${rollHour}:${rollMinute}:${rollSeconds}.603Z`;

  return date;
};

/////////////////////////////////////
//Generate record for a specific itemId, and its support functions
/////////////////////////////////////

let itemIdTracker = 100;
let individualReviewCounter = 1;
let userTracker = 1;
let yesNoTracker = 1;

const generateReview = function () {
  const review_id = individualReviewCounter;
  const score = generateScore();
  const date = generateDate();
  const title = generateReviewTitle();
  const review = generateReviewText();
  const recommended = generateRecommended(score);
  const promotion = Math.random() < 0.35;
  const user_id_users = Math.ceil(Math.random() * 10000000);
  const item_id_items = itemIdTracker;

  return {
    review_id,
    score,
    date,
    title,
    review,
    recommended,
    promotion,
    user_id_users,
    item_id_items,
  };
};

const generateUser = () => {
  const username = lorem.generateWords(2);
  const verified = Math.random() < 0.85;

  return {
    user_id: userTracker,
    username,
    verified,
  };
};

const generateYandN = (number) => {
  const yesAndNos = [];

  for (let i = 0; i < number; i++) {
    const yeses = generateYeses();
    const noes = Math.random() < 0.95 ? 0 : 1;
    const yesNos = {
      yeses,
      noes,
      review_id_reviews: yesNoTracker,
    };
    yesAndNos.push(yesNos);
    yesNoTracker++;
  }

  return yesAndNos;
};

const generateReviews = function (numberToGenerate) {
  const reviews = [];
  let count = numberToGenerate;

  while (count > 0) {
    const review = generateReview();

    reviews.push(review);
    individualReviewCounter++;
    count--;
  }

  return reviews;
};

const generateRecord = function () {
  const number_of_reviews = Math.floor(Math.random() * 3 + 2);
  const reviews = generateReviews(number_of_reviews);
  const yeses_noes = generateYandN(number_of_reviews);
  const user = generateUser();
  let sum = 0;
  const allReviews = [];

  userTracker++;

  for (let i = 0; i < reviews.length; i++) {
    allReviews.push(reviews[i].review_id);
    sum += reviews[i].score;
  }

  const review_average = +(sum / number_of_reviews).toFixed(1);

  const item = {
    item_id: itemIdTracker,
    review_average,
    number_of_reviews,
  };

  return [item, reviews, user, yeses_noes];
};

/////////////////////////////////////
//Initiate randomly generated data - to increase/decrease amount of randomly generated records, alter the number itemIdTracker (starting at 100) is being compared to
/////////////////////////////////////
console.time('Start Generation: ');

const writerItem = csvWriter({ sendHeaders: false });
const writerUser = csvWriter({ sendHeaders: false });
const writerReviews = csvWriter({ sendHeaders: false });
const writerYesNo = csvWriter({ sendHeaders: false });

writerItem.pipe(fs.createWriteStream('items.csv'));
writerReviews.pipe(fs.createWriteStream('reviews.csv'));
writerUser.pipe(fs.createWriteStream('users.csv'));
writerYesNo.pipe(fs.createWriteStream('yeses_noes.csv'));

(async () => {
  for (itemIdTracker; itemIdTracker < 10000100; itemIdTracker++) {
    const generatedSingleRecord = generateRecord();
    const item = generatedSingleRecord[0];
    const reviews = generatedSingleRecord[1];
    const user = generatedSingleRecord[2];
    const yeses_noes = generatedSingleRecord[3];

    if (!writerItem.write(item)) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => writerItem.once('drain', resolve));
    }

    if (!writerUser.write(user)) {
      await new Promise((resolve) => writerUser.once('drain', resolve));
    }

    for (let i = 0; i < reviews.length; i++) {
      if (!writerReviews.write(reviews[i])) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => writerReviews.once('drain', resolve));
      }

      if (!writerYesNo.write(yeses_noes[i])) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => writerYesNo.once('drain', resolve));
      }
    }
  }
  writerItem.end();
  writerUser.end();
  writerReviews.end();
  writerYesNo.end();
  console.timeEnd('Finish Generation: ');
})();
