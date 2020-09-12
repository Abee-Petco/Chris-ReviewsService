import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';

const { connect } = ReactRedux;

class StarChartRow extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleClickRow(score) {
    const { dispatchUpdateFilter } = this.props;

    dispatchUpdateFilter(score);

    document.getElementById('review-link').scrollIntoView({ behavior: 'smooth' });
  }

  handleMouseOverRow(scoreValue) {
    const target = document.getElementById(`star-chart-row-${scoreValue}`);

    target.style.backgroundColor = 'rgb(247, 247, 247)';
  }

  handleMouseOutRow(scoreValue) {
    const target = document.getElementById(`star-chart-row-${scoreValue}`);

    target.style.backgroundColor = null;
  }

  render() {
    const { scoreValue, scoreCount, numberOfReviews } = this.props;

    return (
      <div
        className="star-chart-row"
        id={`star-chart-row-${scoreValue}`}
        style={{
          display: 'flex',
          width: '327px',
          padding: '2px 0 5px 5px',
          margin: '0 0 6px 0'
        }}
        onClick={this.handleClickRow.bind(this, `${scoreValue}`)}
        onMouseOver={this.handleMouseOverRow.bind(this, scoreValue)}
        onMouseOut={this.handleMouseOutRow.bind(this, scoreValue)}
      >
        <div
          id={`star-chart-row-type-${scoreValue}`}
          style={{
            fontSize: '14px',
            color: 'rgb(102, 102, 102)',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            margin: '0 2px 0 0'
          }}
        >
          {scoreValue}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'rgb(102, 102, 102)',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            margin: '0 10px 0 0'
          }}
        >
          &#9733;
        </div>
        <div
          style={{
            height: '10px',
            width: '230px',
            minWidth: '230px',
            backgroundColor: 'rgb(204, 204, 204)',
            borderRadius: '2px',
            backgroundImage:
              '-webkit-linear-gradient(top, rgba(255, 255, 255, 0.3) 0px, rgba(255, 255, 255, 0) 100%)',
            margin: '5px 4px 0 0',
            boxShadow: 'inset 0 0 2px rgba(0,0,0,.25)'
          }}
        >
          <div
            id={`star-chart-row-bar-${scoreValue}`}
            style={{
              height: '10px',
              width: `${(230 / numberOfReviews) * scoreCount}px`,
              backgroundColor: 'rgb(51, 51, 51)',
              borderRadius: '2px',
              backgroundImage:
                '-webkit-linear-gradient(top, rgba(255, 255, 255, 0.3) 0px, rgba(255, 255, 255, 0) 100%)'
            }}
          />
        </div>
        <div
          id={`star-chart-row-count-${scoreValue}`}
          style={{
            fontSize: '12px',
            color: 'rgb(102, 102, 102)',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            width: '64px',
            textAlign: 'center',
            margin: '1px 0 0 0'
          }}
        >
          {scoreCount}
        </div>
      </div>
    );
  }
}

const mapDispatch = function (dispatch) {
  return {
    dispatchUpdateFilter: (score) => {
      dispatch(updateFilter(score, 'ADD'));
    }
  };
};

const wrappedStarChartRow = connect(null, mapDispatch)(StarChartRow);

export default wrappedStarChartRow;
