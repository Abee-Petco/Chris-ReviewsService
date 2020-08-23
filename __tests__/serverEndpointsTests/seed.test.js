const { expect } = require('chai');
const {
  detailedItemReviews,
  detailedIndividualReviews,
} = require('../../server/seed/seed.js');

describe('The seed.js file', () => {
  describe('correctly renders all the records in detailedItemReviews, since', () => {
    it('it produces a record for exactly 100 items', () => {
      expect(detailedItemReviews.length).to.equal(100);
    });

    //   //5,5,5,5,5,5,5,4,4,4,4,3,3,3,2,2,1,1,1,
    //   itemId: '100',
    //   reviewAverage: '3.5',
    //   numberOfReviews: 19,
    //   allReviews: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    // },

    it('all itemIds are within the range 100 to 199', () => {
      detailedItemReviews.forEach((record) => {
        const { itemId } = record;
        expect(Number.parseInt(itemId, 10)).to.be.within(100, 199);
      });
    });

    it('all itemIds are unique', () => {
      const itemIdRecord = {};

      detailedItemReviews.forEach((record) => {
        const { itemId } = record;
        expect(itemIdRecord[itemId]).to.be.undefined;
        itemIdRecord[itemId] = 1;
      });
    });

    it('all reviewAverages are within the range 1.0 to 5.0 with 0.1 increments', () => {
      const validValues = {
        '1.0': 1,
        '1.1': 1,
        '1.2': 1,
        '1.3': 1,
        '1.4': 1,
        '1.5': 1,
        '1.6': 1,
        '1.7': 1,
        '1.8': 1,
        '1.9': 1,
        '2.0': 1,
        '2.1': 1,
        '2.2': 1,
        '2.3': 1,
        '2.4': 1,
        '2.5': 1,
        '2.6': 1,
        '2.7': 1,
        '2.8': 1,
        '2.9': 1,
        '3.0': 1,
        '3.1': 1,
        '3.2': 1,
        '3.3': 1,
        '3.4': 1,
        '3.5': 1,
        '3.6': 1,
        '3.7': 1,
        '3.8': 1,
        '3.9': 1,
        '4.0': 1,
        '4.1': 1,
        '4.2': 1,
        '4.3': 1,
        '4.4': 1,
        '4.5': 1,
        '4.6': 1,
        '4.7': 1,
        '4.8': 1,
        '4.9': 1,
        '5.0': 1,
      };

      detailedItemReviews.forEach((record) => {
        const { reviewAverage } = record;
        expect(validValues[reviewAverage]).to.equal(1);
      });
    });

    it('all numberOfReviews for items 101 and above are within the range 4-17', () => {
      detailedItemReviews.forEach((record) => {
        if (record.itemId !== '100') {
          const { numberOfReviews } = record;
          expect(numberOfReviews).to.be.within(4, 17);
        }
      });
    });

    it('the length of the allReviews array matches the numberOfReviews for each item', () => {
      detailedItemReviews.forEach((record) => {
        const { numberOfReviews, allReviews } = record;
        expect(allReviews.length).to.equal(numberOfReviews);
      });
    });

    it('every value within the allReviews array is a integer number greater than 0', () => {
      detailedItemReviews.forEach((record) => {
        const { allReviews } = record;

        for (let i = 0; i < allReviews.length; i++) {
          expect(allReviews[i]).to.be.above(0);
          expect(Number.isInteger(allReviews[i])).to.be.true;
        }
      });
    });

    it('all numbers within every allReviews array are unique', () => {
      const reviewIdRecord = {};

      detailedItemReviews.forEach((record) => {
        const { allReviews } = record;

        for (let i = 0; i < allReviews.length; i++) {
          const reviewId = allReviews[i];
          expect(reviewIdRecord[reviewId]).to.be.undefined;
          reviewIdRecord[reviewId] = 1;
        }
      });
    });
  });

  describe('correctly renders all the records in detailedIndividualReviews, since', () => {
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

    //The range for this test is arrived at due to the folowing facts:
    //1. The first item is hardcoded to have 19 reviews
    //2. All subsequent items (which there are 99 of) can have a minimum of 4 reviews
    //3. All subsequent items can have a maximum of 17 reviews
    //Thus, the minimum number of reviews should be = 19 + 99(4)
    //and the maximum number of reviews should be = 19 + 99(17)
    //if any of the variables in seed.js that affect this calculation are altered, this test needs to be updated appropriately
    it('the length of the detailedIndividualReviews array is within the range 415-1702', () => {
      expect(detailedIndividualReviews.length).to.be.within(415, 1702);
    });

    it('every score for every review object to be an integer betwen 1-5', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { score } = reviewObject;
        expect(Number.isInteger(score)).to.be.true;
        expect(score).to.be.within(1, 5);
      });
    });

    //valid ISO-8601 string '2020-06-06T22:07:57.603Z'
    it('every date for every review object is a valid ISO-8601 string', () => {
      const validYears = {
        '2020': 1,
        '2019': 1,
        '2018': 1,
      };

      const twelveFullMonths = {
        '01': 1,
        '02': 1,
        '03': 1,
        '04': 1,
        '05': 1,
        '06': 1,
        '07': 1,
        '08': 1,
        '09': 1,
        '10': 1,
        '11': 1,
        '12': 1,
      };

      const validMonths = {
        '2020': {
          '01': 1,
          '02': 1,
          '03': 1,
          '04': 1,
          '05': 1,
        },
        '2019': twelveFullMonths,
        '2018': twelveFullMonths,
      };

      const twentyEightDays = {
        '01': 1,
        '02': 1,
        '03': 1,
        '04': 1,
        '05': 1,
        '06': 1,
        '07': 1,
        '08': 1,
        '09': 1,
        '10': 1,
        '11': 1,
        '12': 1,
        '13': 1,
        '14': 1,
        '15': 1,
        '16': 1,
        '17': 1,
        '18': 1,
        '19': 1,
        '20': 1,
        '21': 1,
        '22': 1,
        '23': 1,
        '24': 1,
        '25': 1,
        '26': 1,
        '27': 1,
        '28': 1,
      };

      const thirtyDays = {
        '01': 1,
        '02': 1,
        '03': 1,
        '04': 1,
        '05': 1,
        '06': 1,
        '07': 1,
        '08': 1,
        '09': 1,
        '10': 1,
        '11': 1,
        '12': 1,
        '13': 1,
        '14': 1,
        '15': 1,
        '16': 1,
        '17': 1,
        '18': 1,
        '19': 1,
        '20': 1,
        '21': 1,
        '22': 1,
        '23': 1,
        '24': 1,
        '25': 1,
        '26': 1,
        '27': 1,
        '28': 1,
        '29': 1,
        '30': 1,
      };

      const thirtyOneDays = {
        '01': 1,
        '02': 1,
        '03': 1,
        '04': 1,
        '05': 1,
        '06': 1,
        '07': 1,
        '08': 1,
        '09': 1,
        '10': 1,
        '11': 1,
        '12': 1,
        '13': 1,
        '14': 1,
        '15': 1,
        '16': 1,
        '17': 1,
        '18': 1,
        '19': 1,
        '20': 1,
        '21': 1,
        '22': 1,
        '23': 1,
        '24': 1,
        '25': 1,
        '26': 1,
        '27': 1,
        '28': 1,
        '29': 1,
        '30': 1,
        '31': 1,
      };

      const validDays = {
        '01': thirtyOneDays,
        '02': twentyEightDays,
        '03': thirtyOneDays,
        '04': thirtyDays,
        '05': thirtyOneDays,
        '06': thirtyDays,
        '07': thirtyOneDays,
        '08': thirtyOneDays,
        '09': thirtyDays,
        '10': thirtyOneDays,
        '11': thirtyDays,
        '12': thirtyOneDays,
      };

      const validHours = {
        '00': 1,
        '01': 1,
        '02': 1,
        '03': 1,
        '04': 1,
        '05': 1,
        '06': 1,
        '07': 1,
        '08': 1,
        '09': 1,
        '10': 1,
        '11': 1,
        '12': 1,
        '13': 1,
        '14': 1,
        '15': 1,
        '16': 1,
        '17': 1,
        '18': 1,
        '19': 1,
        '20': 1,
        '21': 1,
        '22': 1,
        '23': 1,
      };

      const validMinutesSeconds = {
        '00': 1,
        '01': 1,
        '02': 1,
        '03': 1,
        '04': 1,
        '05': 1,
        '06': 1,
        '07': 1,
        '08': 1,
        '09': 1,
        '10': 1,
        '11': 1,
        '12': 1,
        '13': 1,
        '14': 1,
        '15': 1,
        '16': 1,
        '17': 1,
        '18': 1,
        '19': 1,
        '20': 1,
        '21': 1,
        '22': 1,
        '23': 1,
        '24': 1,
        '25': 1,
        '26': 1,
        '27': 1,
        '28': 1,
        '29': 1,
        '30': 1,
        '31': 1,
        '32': 1,
        '33': 1,
        '34': 1,
        '35': 1,
        '36': 1,
        '37': 1,
        '38': 1,
        '39': 1,
        '40': 1,
        '41': 1,
        '42': 1,
        '43': 1,
        '44': 1,
        '45': 1,
        '46': 1,
        '47': 1,
        '48': 1,
        '49': 1,
        '50': 1,
        '51': 1,
        '52': 1,
        '53': 1,
        '54': 1,
        '55': 1,
        '56': 1,
        '57': 1,
        '58': 1,
        '59': 1,
      };

      detailedIndividualReviews.forEach((reviewObject) => {
        const { date } = reviewObject;
        expect(date).to.be.a('string');
        expect(date.indexOf('T')).to.equal(10);

        const dateSplit = date.split('T');

        const yearMonthDay = dateSplit[0].split('-');
        const year = yearMonthDay[0];

        expect(validYears[year]).to.equal(1);

        const month = yearMonthDay[1];

        expect(validMonths[year][month]).to.equal(1);

        const day = yearMonthDay[2];

        expect(validDays[month][day]).to.equal(1);

        const hourMinuteSeconds = dateSplit[1].split(':');
        const hour = hourMinuteSeconds[0];

        expect(validHours[hour]).to.equal(1);

        const minute = hourMinuteSeconds[1];

        expect(validMinutesSeconds[minute]).to.equal(1);

        const secondsMilliseconds = hourMinuteSeconds[2].split('.');
        const seconds = secondsMilliseconds[0];

        expect(validMinutesSeconds[seconds]).to.equal(1);

        expect(secondsMilliseconds[1]).to.equal('603Z');
      });
    });

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
    it('every review title in every review object is a string with 1 - 7 words in it', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { title } = reviewObject;
        expect(title).to.be.a('string');
        const titleSplit = title.split(' ');
        expect(titleSplit.length).to.be.within(1, 7);
      });
    });

    it('every review in every review object is a string with at least 3 words in it', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { review } = reviewObject;
        expect(review).to.be.a('string');
        const reviewSplit = review.split(' ');
        expect(reviewSplit.length).to.be.above(2);
      });
    });

    it('every username in every review object is a one word string', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { username } = reviewObject;
        expect(username).to.be.a('string');
        const usernameSplit = username.split(' ');
        expect(usernameSplit.length).to.equal(1);
      });
    });

    it('every recommended in every review object is either set to true or false', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { recommended } = reviewObject;
        expect(recommended).to.be.a('boolean');
      });
    });

    it('every yeses in every review object is a integer between 0-3, except those for item 100', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { yeses } = reviewObject;

        expect(Number.isInteger(yeses)).to.be.true;

        if (reviewObject.reviewId > 19) {
          expect(yeses).to.be.within(0, 3);
        } else {
          expect(yeses).to.be.within(0, 20);
        }
      });
    });

    it('every noes in every review object is a 0 or a 1, except those for item 100', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { noes } = reviewObject;

        expect(Number.isInteger(noes)).to.be.true;

        if (reviewObject.reviewId > 19) {
          expect(noes).to.be.within(0, 1);
        } else {
          expect(noes).to.be.within(0, 10);
        }
      });
    });

    it('every verified in every review object is either set to true or false', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { verified } = reviewObject;
        expect(verified).to.be.a('boolean');
      });
    });

    it('every recommended in every review object is either set to true or false', () => {
      detailedIndividualReviews.forEach((reviewObject) => {
        const { promotion } = reviewObject;
        expect(promotion).to.be.a('boolean');
      });
    });
  });
});
