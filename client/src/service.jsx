import ReviewHeader from './Components/ReviewHeader/index.jsx';
import ReviewBody from './Components/ReviewBody/index.jsx';
import Reviews from './Components/Reviews/index.jsx';
import updateReviewAverage from './ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from './ReduxSpecificComponents/Actions/updateNumberOfReviews.js';
import updateAllReviews from './ReduxSpecificComponents/Actions/updateAllReviews.js';
import updateFilteredReviews from './ReduxSpecificComponents/Actions/updateFilteredReviews.js';
import enviromentalVariables from './enviromentalVariables.js';

const { IP_ADDRESS } = enviromentalVariables;
const { connect } = ReactRedux;

class ReviewsModule extends React.Component {
  componentDidMount() {
    const {
      dispatchUpdateReviewAverage,
      dispatchUpdateNumberOfReviews,
      dispatchUpdateAllReviews,
      dispatchUpdateFilteredReviews,
    } = this.props;

    let itemID = '100';

    const { search } = window.location;

    if (search !== '') {
      const searchSplit = search.split('&');
      let splitItemID;

      for (let i = 0; i < searchSplit.length; i++) {
        if (searchSplit[i].includes('itemID')) {
          splitItemID = searchSplit[i].split('=');
          break;
        }
      }
      itemID = splitItemID[1];
    }

    axios
      .get(`http://${IP_ADDRESS}:3001/reviews/${itemID}`)
      .then((results) => {
        const { reviewAverage, numberOfReviews, allReviews } = results.data;

        dispatchUpdateReviewAverage(reviewAverage);
        dispatchUpdateNumberOfReviews(numberOfReviews);
        dispatchUpdateAllReviews(allReviews);
        dispatchUpdateFilteredReviews(allReviews);

        if (numberOfReviews === 0) {
          store.dispatch(updateReviewRange('RESET', [0, -1]));
        } else if (numberOfReviews < 8) {
          store.dispatch(updateReviewRange('RESET', [0, numberOfReviews - 1]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // console.log('Review freshly mounted')
    return (
      <div
        id="reviews-module"
        style={{ display: 'flex', flexDirection: 'column', flexShrink: '0' }}
      >
        {/*The tag directly below this is for testing purposes only. Make sure to comment out before building for production*/}
        {/* <div id="MODAL_ATTACH_POINT" /> */}
        <ReviewHeader />
        <ReviewBody />
        <Reviews />
        <div id="place-holder-questions" />
      </div>
    );
  }
}

const mapDispatch = function (dispatch) {
  return {
    dispatchUpdateReviewAverage: (reviewAverage) => {
      dispatch(updateReviewAverage(reviewAverage));
    },
    dispatchUpdateNumberOfReviews: (numberOfReviews) => {
      dispatch(updateNumberOfReviews(numberOfReviews));
    },
    dispatchUpdateAllReviews: (allReviews) => {
      dispatch(updateAllReviews(allReviews));
    },
    dispatchUpdateFilteredReviews: (allReviews) => {
      dispatch(updateFilteredReviews(allReviews));
    },
  };
};

const wrappedReviewsModule = connect(null, mapDispatch)(ReviewsModule);

export default wrappedReviewsModule;
