import reviewAverageReducer from './Reducers/reviewAverageReducer.js';
import numberOfReviewsReducer from './Reducers/numberOfReviewsReducer.js';
import allReviewsReducer from './Reducers/allReviewsReducer.js';
import filterReducer from './Reducers/filterReducer.js';
import reviewRangeReducer from './Reducers/reviewRangeReducer.js';
import showRatingFilterReducer from './Reducers/showRatingFilterReducer.js';
import filteredReviewsReducer from './Reducers/filteredReviewsReducer';
import currentNonNumberFilterSettingReducer from './Reducers/currentNonNumberFilterSettingReducer.js';
import showNonNumberFilterSettingReducer from './Reducers/showNonNumberFilterSettingReducer.js';
import exitedNonNumberFilterDropDownSourceReducer from './Reducers/exitedNonNumberFilterDropDownSourceReducer.js';
import enteredNonNumberFilterSettingReducer from './Reducers/enteredNonNumberFilterSettingReducer.js';
import exitedRatingFilterReducer from './Reducers/exitedRatingFilterReducer.js';
import enteredRatingFilterDropDownReducer from './Reducers/enteredRatingFilterDropDownReducer.js';
import showRatingFilterDropDownReducer from './Reducers/showRatingFilterDropDownReducer.js';

const { combineReducers } = Redux;

const rootReducer = combineReducers({
  reviewAverage: reviewAverageReducer,
  numberOfReviews: numberOfReviewsReducer,
  allReviews: allReviewsReducer,
  filter: filterReducer,
  reviewRange: reviewRangeReducer,
  showRatingFilter: showRatingFilterReducer,
  filteredReviews: filteredReviewsReducer,
  currentNonNumberFilterSetting: currentNonNumberFilterSettingReducer,
  showNonNumberFilterSetting: showNonNumberFilterSettingReducer,
  exitedNonNumberFilterDropDownSource: exitedNonNumberFilterDropDownSourceReducer,
  enteredNonNumberFilterSetting: enteredNonNumberFilterSettingReducer,
  exitedRatingFilter: exitedRatingFilterReducer,
  enteredRatingFilterDropDown: enteredRatingFilterDropDownReducer,
  showRatingFilterDropDown: showRatingFilterDropDownReducer,
});

export default rootReducer;
