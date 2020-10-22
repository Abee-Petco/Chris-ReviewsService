import environmentalVariables from './environmentalVariables.js';

const { IMAGE_IP_ADDRESS } = environmentalVariables;

//////dynamic stars
const dynamicStarsGrayStars = {
  position: 'absolute',
  top: '0',
  left: '0',
  height: 'inherit',
  width: '60px',
  fontSize: 'inherit',
  color: '#ccc',
  lineSpacing: '1px',
  letterSpacing: '-1px'
};

//////reviewHeader
const reviewHeaderItemLink = {
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  fontStyle: 'normal',
  color: 'inherit',
  alignItems: 'center',
  padding: '8px 10px',
  height: '37px',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif'
};

const reviewHeaderItemLinkLinklike = {
  textDecoration: 'underline',
  color: '#005891',
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif'
};

const reviewHeaderItemLinkLinkNatureHidden = {
  color: '#333',
  fontSize: '15.6px',
  fontWeight: '700',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
  margin: '0 0 1px 0'
};

const reviewHeaderListItem = {
  display: 'list-item',
  float: 'right',
  height: 'auto',
  width: '160px',
  left: 'auto'
};

const reviewHeaderWrapper = {
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '1095px',
  backgroundColor: '#f7f7f7',
  flexShrink: '0',
  borderBottom: '1px solid',
  borderColor: '#ccc'
};

const reviewHeaderTopHalf = {
  borderBottom: '1px solid',
  borderColor: '#ccc',
  width: 'auto',
  height: '30px',
  padding: '10px 20px'
};

const reviewHeaderReviewAverage = {
  padding: '1px 10px 0 7px',
  borderRight: '1px solid #ccc',
  height: '18px',
  color: '#666',
  fontSize: '14px',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
  margin: '1px -1px 0 0'
};

const reviewHeaderSearchBar = {
  fontSize: '14px',
  width: '418px',
  height: '16px',
  borderColor: 'rgb(221, 221, 221)',
  borderTopColor: 'rgb(187, 187, 187',
  borderStyle: 'solid',
  margin: '10px 0',
  borderWidth: '1px',
  padding: '7px 10px',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
  borderTopLeftRadius: '3.5px',
  borderBottomLeftRadius: '3.5px',
  boxShadow: 'rgb(255, 255, 255) 0px 1px 1px 0px'
};

const reviewHeaderSearchBarButton = {
  backgroundImage: `url("http://${IMAGE_IP_ADDRESS}:3001/searchMagnifyingGlass.png")`,
  height: '32px',
  width: '88px',
  border: 'none',
  margin: '10px 0',
  padding: '1px 0',
  cursor: 'pointer'
};

const reviewHeaderList = {
  listStyleType: 'none',
  height: '52px',
  width: '480px',
  float: 'right',
  margin: '0 0 0 auto'
};

export {
  reviewHeaderItemLink,
  reviewHeaderItemLinkLinklike,
  reviewHeaderItemLinkLinkNatureHidden,
  reviewHeaderListItem,
  reviewHeaderWrapper,
  reviewHeaderTopHalf,
  reviewHeaderReviewAverage,
  reviewHeaderSearchBar,
  reviewHeaderSearchBarButton,
  reviewHeaderList,
  dynamicStarsGrayStars
};
