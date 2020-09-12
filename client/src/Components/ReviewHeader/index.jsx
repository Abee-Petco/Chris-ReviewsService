import DynamicReviewStars from '../General/dynamicReviewStars.jsx';
import {
  reviewHeaderItemLink,
  reviewHeaderItemLinkLinklike,
  reviewHeaderItemLinkLinkNatureHidden,
  reviewHeaderListItem,
  reviewHeaderWrapper,
  reviewHeaderTopHalf,
  reviewHeaderReviewAverage,
  reviewHeaderSearchBar,
  reviewHeaderSearchBarButton,
  reviewHeaderList
} from '../../CSSstyles.js';
import environmentalVariables from '../../environmentalVariables.js';

const { IP_ADDRESS } = environmentalVariables;
const { connect } = ReactRedux;

class ReviewHeader extends React.Component {
  // constructor() {
  //   super();
  // }

  //makes a slighlty modified copy of reviewHeaderItemLink since the middle link need left/right borders
  modifiedStyleForReviewHeaderItemLink(originalStyle) {
    const newStyles = {};
    Object.assign(newStyles, originalStyle);
    newStyles.marginLeft = '1px';
    newStyles.borderRight = '1px solid';
    newStyles.borderRightColor = '#ccc';
    newStyles.padding = '8px 10px 8px 11px';

    return newStyles;
  }

  modifiedStyleForReviewHeaderItemLinkLeftMost(originalStyle) {
    const newStyles = {};
    Object.assign(newStyles, originalStyle);
    newStyles.padding = '8px 8px 8px 10px';
    newStyles.borderRight = '1px solid';
    newStyles.borderRightColor = '#ccc';

    return newStyles;
  }

  changeColorOnMouseOver(e) {
    const { id } = e.target;
    document.getElementById(id).style.color = '#009cd9';
  }

  changeColorOnMouseOut(e) {
    const { id } = e.target;
    document.getElementById(id).style.color = '#005891';
  }

  changeImageOnMouseOver(e) {
    const { id } = e.target;
    document.getElementById(
      id
    ).style.backgroundImage = `url("http://${IP_ADDRESS}:3001/searchMagnifyingGlassHover.png")`;
  }

  changeImageOnMouseOut(e) {
    const { id } = e.target;
    document.getElementById(
      id
    ).style.backgroundImage = `url("http://${IP_ADDRESS}:3001/searchMagnifyingGlass.png")`;
  }

  smoothScrollReviews(e) {
    e.preventDefault();

    document.getElementById('review-link').scrollIntoView({
      behavior: 'smooth'
    });
  }

  smoothScrollQuestions(e) {
    e.preventDefault();

    document.getElementById('place-holder-questions').scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { reviewAverage, numberOfReviews } = this.props;

    return (
      <div id="review-header-component" style={reviewHeaderWrapper}>
        <div style={reviewHeaderTopHalf}>
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <a
              title={`Read ${numberOfReviews} Reviews`}
              href="#review-link"
              onClick={this.smoothScrollReviews}
              style={{ position: 'relative', height: 'inherit', width: 'inherit' }}
            >
              <DynamicReviewStars />
            </a>
            <div id="header-upper-review-average" style={reviewHeaderReviewAverage}>
              {reviewAverage}
            </div>
            <div style={{ paddingLeft: '10px', marginTop: '1px' }}>
              <a
                id="header-upper-reviews"
                onClick={this.smoothScrollReviews}
                onMouseOut={this.changeColorOnMouseOut}
                onMouseOver={this.changeColorOnMouseOver}
                href="#review-link"
                style={reviewHeaderItemLinkLinklike}
              >{`${numberOfReviews} Reviews`}</a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: '52px', paddingRight: '1px' }}>
          <div style={{ width: '529px', display: 'flex', marginLeft: '10px' }}>
            <input style={reviewHeaderSearchBar} placeholder="Search topics and reviews" />
            <button
              type="button"
              id="magnifying-glass"
              onMouseOut={this.changeImageOnMouseOut}
              onMouseOver={this.changeImageOnMouseOver}
              style={reviewHeaderSearchBarButton}
            />
          </div>
          <ul style={reviewHeaderList}>
            <li style={reviewHeaderListItem}>
              <a
                href="#place-holder-questions"
                onClick={this.smoothScrollQuestions}
                style={reviewHeaderItemLink}
              >
                <span style={reviewHeaderItemLinkLinkNatureHidden}>0</span>
                <span
                  id="item-link-answers"
                  onMouseOut={this.changeColorOnMouseOut}
                  onMouseOver={this.changeColorOnMouseOver}
                  style={reviewHeaderItemLinkLinklike}
                >
                  Answers
                </span>
              </a>
            </li>
            <li style={reviewHeaderListItem}>
              <a
                href="#place-holder-questions"
                onClick={this.smoothScrollQuestions}
                style={this.modifiedStyleForReviewHeaderItemLink(reviewHeaderItemLink)}
              >
                <span style={reviewHeaderItemLinkLinkNatureHidden}>0</span>
                <span
                  id="item-link-questions"
                  onMouseOut={this.changeColorOnMouseOut}
                  onMouseOver={this.changeColorOnMouseOver}
                  style={reviewHeaderItemLinkLinklike}
                >
                  Questions
                </span>
              </a>
            </li>
            <li style={reviewHeaderListItem}>
              <a
                href="#review-link"
                onClick={this.smoothScrollReviews}
                style={this.modifiedStyleForReviewHeaderItemLinkLeftMost(reviewHeaderItemLink)}
              >
                <span id="item-value-reviews" style={reviewHeaderItemLinkLinkNatureHidden}>
                  {numberOfReviews}
                </span>
                <span
                  id="item-link-reviews"
                  onMouseOut={this.changeColorOnMouseOut}
                  onMouseOver={this.changeColorOnMouseOver}
                  style={reviewHeaderItemLinkLinklike}
                >
                  Reviews
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = function (state) {
  const { reviewAverage, numberOfReviews } = state;

  return {
    reviewAverage,
    numberOfReviews
  };
};

const wrappedReviewHeader = connect(mapState)(ReviewHeader);

export default wrappedReviewHeader;
