import SolidReviewStars from '../General/solidReviewStars.jsx';
import Helpful from './helpful.jsx';
import environmentalVariables from '../../environmentalVariables.js';

const { IP_ADDRESS } = environmentalVariables;

class IndividualReview extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const { indexInCurrentFilteredReviews, reviewObject, modal } = this.props;
    const {
      username,
      title,
      review,
      score,
      recommended,
      yeses,
      noes,
      date,
      verified,
      promotion,
      disabled
    } = reviewObject;

    let wrapperStyle;
    let reviewStyle;

    if (modal) {
      wrapperStyle = {
        display: 'flex',
        margin: '10px 0 21px 20px',
        maxWidth: '640px',
        minWidth: '640px'
      };
      reviewStyle = {
        fontSize: '14px',
        fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
        color: 'rgb(102, 102, 102)',
        maxWidth: '520px',
        minWidth: '520px',
        lineHeight: '20px'
      };
    } else {
      wrapperStyle = {
        display: 'flex',
        margin: '20px 0 11px 20px',
        width: '1035px'
      };
      reviewStyle = {
        fontSize: '14px',
        fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
        color: 'rgb(102, 102, 102)',
        width: '895px',
        lineHeight: '20px'
      };
    }

    const dateSplit = date.split('T');
    dateSplit[1] = dateSplit[1].substring(0, 12);
    const newDate = dateSplit.join(' ');

    const specialStamps = [];

    if (promotion) {
      specialStamps.push(
        <img
          style={{ maxHeight: '25px', maxWidth: '100%' }}
          src="https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/sweepstakesoptinyes.jpeg"
        />
      );
    }

    if (verified) {
      specialStamps.push(
        <img
          style={{ maxHeight: '25px', maxWidth: '100%', margin: '0 0 0 10px' }}
          src="https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/verifiedpurchaser_1yes.jpeg"
        />
      );
    }

    const recommendedOrNot = [];

    if (recommended) {
      recommendedOrNot.push(
        <div
          style={{
            display: 'flex',
            margin: '30px 0 0 0'
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-9px',
                left: '-1px',
                color: '#333',
                fontSize: '26px'
              }}
            >
              &#9679;
            </div>
            <div
              style={{
                position: 'absolute',
                top: '-5px',
                left: '0px',
                color: 'white',
                fontSize: '7px',
                margin: '8px 0 0 0',
                padding: '1px 0 0 4px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif'
              }}
            >
              &#10004;
            </div>
          </div>
          <div
            style={{
              margin: '0 8px 0 16px',
              fontSize: '14px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              color: 'rgb(51, 51, 51)'
            }}
          >
            Yes,
          </div>
          <div
            style={{
              fontSize: '14px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              color: 'rgb(102, 102, 102)'
            }}
          >
            I recommend this product.
          </div>
        </div>
      );
    } else {
      recommendedOrNot.push(
        <div
          style={{
            display: 'flex',
            margin: '30px 0 0 0'
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-9px',
                left: '-1px',
                color: '#333',
                fontSize: '26px'
              }}
            >
              &#9679;
            </div>
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '0px',
                color: 'white',
                fontSize: '10px',
                margin: '8px 0 0 0',
                padding: '1px 0 0 4px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif'
              }}
            >
              x
            </div>
          </div>
          <div
            style={{
              margin: '0 8px 0 16px',
              fontSize: '14px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              color: 'rgb(51, 51, 51)'
            }}
          >
            No,
          </div>
          <div
            style={{
              fontSize: '14px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              color: 'rgb(102, 102, 102)'
            }}
          >
            I do not recommend this product.
          </div>
        </div>
      );
    }

    return (
      <div className="individual-review" style={wrapperStyle}>
        <img
          src={`http://${IP_ADDRESS}:3001/silhouette.png`}
          style={{
            height: '48px',
            width: '48px',
            margin: '2px 11px 0 0'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: modal === 'modal' ? '561px' : '976px' }}>
            <SolidReviewStars score={score} />
            <div
              style={{
                fontSize: '13px',
                fontWeight: '700',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                color: 'rgb(51, 51, 51)',
                margin: '7px 6px 0 0'
              }}
            >
              {username}
            </div>
            <div
              style={{
                fontSize: '13px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                color: 'rgb(102, 102, 102)',
                margin: '7px 4px 0 0'
              }}
            >
              &#183;
            </div>
            <div
              style={{
                fontSize: '13px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                color: 'rgb(102, 102, 102)',
                margin: '7px auto 0 0'
              }}
            >
              {moment(newDate).fromNow()}
            </div>
            <div style={{ display: 'flex', float: 'right' }}>{specialStamps}</div>
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              color: 'rgb(51, 51, 51)',
              margin: '5px 0 14px 0',
              overflow: 'hidden',
              width: modal === 'modal' ? '520px' : '895px'
            }}
          >
            {title}
          </div>
          <div style={reviewStyle}>{review}</div>
          {recommendedOrNot}
          {/* <div> Yes or no if this reviewer recommends the product circle: &#9679; check: &#10004; x: x</div> */}
          <Helpful
            disabled={disabled}
            yeses={yeses}
            noes={noes}
            indexInCurrentFilteredReviews={indexInCurrentFilteredReviews}
            modal={modal}
          />
        </div>
      </div>
    );
  }
}

export default IndividualReview;
