import Filter from './filter.jsx';
import Navigation from './navigation.jsx';
import IndividualReview from './individualReview.jsx';
import NonNumberFilterSettings from './nonNumberFilterSettings.jsx';

const { connect } = ReactRedux;

class Reviews extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const { numberOfReviews, showNonNumberFilterSetting } = this.props;

    //If no reviews, this entire component does not mount anything of value
    if (numberOfReviews === 0) {
      return (
        <div />
      );
    }

    const nonNumberFilterSettings = [];

    if (showNonNumberFilterSetting) {
      nonNumberFilterSettings.push(<NonNumberFilterSettings />);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Filter />
        {nonNumberFilterSettings}
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <Navigation />
      </div>
    );
  }
}

const mapState = function(state) {
  const { numberOfReviews, showNonNumberFilterSetting } = state;

  return {
    numberOfReviews,
    showNonNumberFilterSetting,
  };
};

const wrappedReviews = connect(mapState)(Reviews);

export default wrappedReviews;
