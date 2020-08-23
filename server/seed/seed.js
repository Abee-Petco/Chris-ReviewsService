const { LoremIpsum } = require('lorem-ipsum');

/////////////////////////////////////
//Hardcoded data
/////////////////////////////////////
const detailedItemReviews = [
  {
    //5,5,5,5,5,5,5,4,4,4,4,3,3,3,2,2,1,1,1,
    itemId: '100',
    reviewAverage: '3.5',
    numberOfReviews: 19,
    allReviews: [
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
    ],
  },
];

const detailedIndividualReviews = [
  {
    reviewId: 1,
    score: 5,
    date: '2020-05-06T22:07:57.603Z',
    title: 'Lorem ipsum dolor sit amet',
    review:
      'Morbi commodo justo tortor, malesuada imperdiet justo condimentum eget. Nam fringilla orci dui, non semper nisl venenatis eget. Phasellus nec.',
    username: 'ChonkyCat',
    recommended: true,
    yeses: 5,
    noes: 1,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 2,
    score: 5,
    date: '2019-05-06T22:07:57.603Z',
    title: 'consectetur adipiscing elit',
    review:
      'Mauris eget libero ex. Nulla facilisis luctus maximus. Proin eget euismod orci. Cras finibus, magna.',
    username: 'TummyScratcher',
    recommended: true,
    yeses: 1,
    noes: 3,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 3,
    score: 5,
    date: '2019-12-06T22:07:57.603Z',
    title: 'Ut vestibulum',
    review:
      'Aenean semper nunc ac consectetur vestibulum. Morbi et quam placerat, tincidunt lectus in, aliquam sapien. Fusce ultrices nibh in sapien imperdiet, nec semper urna consectetur. Proin accumsan nec mauris ac vehicula. In hac habitasse platea.',
    username: 'NotACatLady',
    recommended: true,
    yeses: 5,
    noes: 0,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 4,
    score: 5,
    date: '2020-03-15T22:07:57.603Z',
    title: 'massa vulputate bibendum auctor',
    review:
      'Suspendisse bibendum lectus sit amet ante auctor consequat. Sed malesuada urna erat, tempus sollicitudin augue porttitor sit amet. Duis viverra.',
    username: 'CatButt',
    recommended: true,
    yeses: 20,
    noes: 0,
    verified: false,
    promotion: true,
  },
  {
    reviewId: 5,
    score: 5,
    date: '2018-07-06T22:07:57.603Z',
    title: 'felis odio accumsan ex',
    review:
      'Suspendisse bibendum lectus sit amet ante auctor consequat. Sed malesuada urna erat, tempus sollicitudin augue porttitor sit amet. Duis viverra.',
    username: 'Froggy',
    recommended: true,
    yeses: 1,
    noes: 1,
    verified: true,
    promotion: true,
  },
  {
    reviewId: 6,
    score: 5,
    date: '2019-01-30T22:07:57.603Z',
    title: 'eget',
    review:
      'Suspendisse arcu dolor, hendrerit ultrices lacus et, vulputate finibus nulla. Cras enim augue, molestie vitae arcu fermentum, commodo egestas nunc. Curabitur massa tellus, iaculis in turpis nec, rutrum scelerisque turpis. Donec mattis, lorem.',
    username: 'PikaPika',
    recommended: true,
    yeses: 4,
    noes: 0,
    verified: true,
    promotion: true,
  },
  {
    reviewId: 7,
    score: 5,
    date: '2020-01-06T22:07:57.603Z',
    title: 'Lorem ipsum dolor sit amet',
    review:
      'Nunc ex massa, porttitor pulvinar pharetra sit amet, consequat quis lorem. Vestibulum efficitur.',
    username: 'catdude',
    recommended: true,
    yeses: 10,
    noes: 9,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 8,
    score: 4,
    date: '2020-01-21T21:07:57.603Z',
    title: 'consectetur adipiscing elit',
    review:
      'Nullam accumsan metus justo, non semper quam iaculis vel. Proin in eros lacus. Integer at velit.',
    username: 'CVCat',
    recommended: true,
    yeses: 2,
    noes: 3,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 9,
    score: 4,
    date: '2018-04-06T22:07:57.603Z',
    title: 'Curabitur ultrices tempus lorem',
    review:
      'Quisque dapibus, urna ac varius mattis, nisi nunc venenatis urna, a.',
    username: 'Bob',
    recommended: true,
    yeses: 10,
    noes: 10,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 10,
    score: 4,
    date: '2020-05-05T22:07:57.603Z',
    title: 'Ut a lectus non nibh ornare facilisis',
    review:
      'Fusce quis erat ornare, tincidunt odio eget, tempor velit. Donec placerat vestibulum diam. Maecenas molestie congue mauris.',
    username: 'ElGatoSupreme',
    recommended: true,
    yeses: 10,
    noes: 0,
    verified: false,
    promotion: true,
  },
  {
    reviewId: 11,
    score: 4,
    date: '2020-02-06T22:07:57.603Z',
    title: 'Lorem ipsum dolor sit amet',
    review:
      'Praesent justo ante, porta at dui eget, placerat scelerisque ex. In hac habitasse platea dictumst. Maecenas at libero ut dolor.',
    username: 'Winifred',
    recommended: true,
    yeses: 6,
    noes: 4,
    verified: true,
    promotion: true,
  },
  {
    reviewId: 12,
    score: 3,
    date: '2018-09-06T22:07:57.603Z',
    title: 'consectetur adipiscing elit',
    review:
      'Mauris sit amet risus purus. Aenean sem ex, aliquam non velit a, varius lobortis neque. Donec tincidunt sit amet mauris eget suscipit. Sed eget lectus leo. Praesent condimentum metus lacus, et tincidunt ipsum fringilla eu.',
    username: 'Sarah',
    recommended: true,
    yeses: 20,
    noes: 1,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 13,
    score: 3,
    date: '2019-07-06T22:07:57.603Z',
    title: 'Donec in congue diam',
    review:
      'Suspendisse mollis in felis non blandit. Proin pellentesque dui sed turpis pharetra, a pretium odio fermentum. In hac habitasse platea dictumst. Etiam cursus augue ut.',
    username: 'Emily',
    recommended: false,
    yeses: 0,
    noes: 4,
    verified: false,
    promotion: false,
  },
  {
    reviewId: 14,
    score: 3,
    date: '2020-03-24T22:07:57.603Z',
    title: 'Praesent finibus leo nec nisl auctor luctus',
    review:
      'Ut gravida ultrices cursus. Suspendisse potenti. Aenean in mi euismod, tempor ligula vel, ornare nisl. Pellentesque id fringilla urna.',
    username: 'Mary',
    recommended: true,
    yeses: 3,
    noes: 4,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 15,
    score: 2,
    date: '2020-05-16T22:07:57.603Z',
    title: 'Lorem ipsum dolor sit amet',
    review:
      'Suspendisse ultricies ac ligula et molestie. Quisque nisi ante, maximus in mattis sed, finibus id magna. Pellentesque quis finibus ex, non congue augue.',
    username: 'Binx',
    recommended: false,
    yeses: 0,
    noes: 5,
    verified: true,
    promotion: true,
  },
  {
    reviewId: 16,
    score: 2,
    date: '2018-05-06T22:07:57.603Z',
    title: 'consectetur adipiscing elit',
    review:
      'Vestibulum dapibus maximus tellus, ac imperdiet diam bibendum nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacus neque, sollicitudin at mauris a, aliquam laoreet enim. Duis turpis urna, auctor at facilisis eleifend, euismod nec odio. Mauris blandit est sed augue lacinia, nec ultricies.',
    username: 'Billy',
    recommended: false,
    yeses: 3,
    noes: 8,
    verified: false,
    promotion: true,
  },
  {
    reviewId: 17,
    score: 1,
    date: '2019-07-06T22:07:57.603Z',
    title: 'Nunc vel elit quis sapien porta malesuada',
    review: 'Ut tellus justo, aliquam at libero quis.',
    username: 'Dani',
    recommended: false,
    yeses: 0,
    noes: 0,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 18,
    score: 1,
    date: '2018-11-01T22:07:57.603Z',
    title: 'Cras in felis semper',
    review:
      'Etiam a est sit amet libero aliquam tristique id at libero. Sed id condimentum risus, nec sollicitudin mauris. Duis.',
    username: 'Max',
    recommended: false,
    yeses: 1,
    noes: 4,
    verified: true,
    promotion: false,
  },
  {
    reviewId: 19,
    score: 1,
    date: '2020-02-14T22:07:57.603Z',
    title: 'Lorem ipsum dolor sit amet',
    review:
      'Donec eget ligula id mi tempor viverra nec quis felis. Proin in facilisis justo.',
    username: 'Allison',
    recommended: false,
    yeses: 2,
    noes: 1,
    verified: true,
    promotion: true,
  },
];

let itemIdTracker = 101;
let individualReviewCounter = detailedIndividualReviews.length;

/////////////////////////////////////
//End hardcoded data/Start randomly generated data
/////////////////////////////////////

/////////////////////////////////////
//Yeses
/////////////////////////////////////

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
const LoremIpsumTitle = new LoremIpsum({
  wordsPerSentence: {
    max: 7,
    min: 1,
  },
});

const generateReviewTitle = function () {
  return LoremIpsumTitle.generateSentences(1);
};

/////////////////////////////////////
//ReviewText
/////////////////////////////////////

const LoremIpsumText = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 1,
  },
  wordsPerSentence: {
    max: 10,
    min: 3,
  },
});

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
  const numberOfParagraphsRoll = Math.floor(Math.random() * 10);
  return LoremIpsumText.generateParagraphs(
    reviewLengthMapping[numberOfParagraphsRoll]
  );
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

//example review object
// {
//   reviewId: 1,
//   score: 5,
//   date: '2020-06-06T22:07:57.603Z',
//   review: 'Morbi commodo justo tortor, malesuada imperdiet justo condimentum eget. Nam fringilla orci dui, non semper nisl venenatis eget. Phasellus nec.',
//   username: 'ChonkyCat',
//   recommended: true,
//   yeses: 5,
//   noes: 1,
//   verified: true,
//   promotion: false,
// },

const generateReview = function () {
  individualReviewCounter++;
  const reviewId = individualReviewCounter;
  const score = generateScore();
  const date = generateDate();
  const title = generateReviewTitle();
  const review = generateReviewText();
  const username = LoremIpsumText.generateWords(1);
  const recommended = generateRecommended(score);
  const yeses = generateYeses();
  const noes = Math.random() < 0.95 ? 0 : 1;
  const verified = Math.random() < 0.85;
  const promotion = Math.random() < 0.35;

  return {
    reviewId,
    score,
    date,
    title,
    review,
    username,
    recommended,
    yeses,
    noes,
    verified,
    promotion,
  };
};

const generateReviews = function (numberToGenerate) {
  const reviews = [];
  let count = numberToGenerate;

  while (count > 0) {
    const review = generateReview();
    reviews.push(review);
    count--;
  }

  return reviews;
};

const generateRecord = function () {
  const itemId = itemIdTracker;
  const numberOfReviews = Math.floor(Math.random() * 14 + 4);
  const randomlyGeneratedReviews = generateReviews(numberOfReviews);

  let sum = 0;
  const allReviews = [];

  for (let i = 0; i < randomlyGeneratedReviews.length; i++) {
    allReviews.push(randomlyGeneratedReviews[i].reviewId);
    detailedIndividualReviews.push(randomlyGeneratedReviews[i]);
    sum += randomlyGeneratedReviews[i].score;
  }

  let reviewAverage = sum / numberOfReviews;

  if (Number.isInteger(reviewAverage)) {
    reviewAverage = `${reviewAverage}.0`;
  } else {
    const reviewAverageArray = reviewAverage.toString().split('');

    if (reviewAverageArray[3]) {
      if (Number.parseInt(reviewAverageArray[3], 10) >= 5) {
        const tenthsPlace = Number.parseInt(reviewAverageArray[2], 10) + 1;

        if (tenthsPlace === 10) {
          reviewAverageArray[2] = '0';
          reviewAverageArray[0] = (
            Number.parseInt(reviewAverageArray[0], 10) + 1
          ).toString();
        }
      }
    }
    const splitFinalNumber = reviewAverageArray.slice(0, 3);
    reviewAverage = splitFinalNumber.join('');
  }

  detailedItemReviews.push({
    itemId,
    reviewAverage,
    numberOfReviews,
    allReviews,
  });
  //go through all reviews, add them to detailedIndividualReviews, extract score and add to sum, so reviewAverage
  //can be calculated, also add reviewId to allReviews array
};

/////////////////////////////////////
//Initiate randomly generated data - to increase/decrease amount of randomly generated records, alter the number itemIdTracker is being compared to
/////////////////////////////////////
if (process.env.node_env !== 'test') {
  while (itemIdTracker <= 199) {
    generateRecord();
    itemIdTracker++;
  }
} else {
  while (itemIdTracker <= 126) {
    generateRecord();
    itemIdTracker++;
  }
}

module.exports.detailedItemReviews = detailedItemReviews;
module.exports.detailedIndividualReviews = detailedIndividualReviews;
