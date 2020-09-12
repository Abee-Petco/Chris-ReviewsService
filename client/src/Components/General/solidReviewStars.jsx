class SolidReviewStars extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const { score } = this.props;
    const scoreDisplay = [];

    let numberOfGrayStars = 5;
    let numberOfBlackStars = score;

    while (numberOfBlackStars > 0) {
      scoreDisplay.push(
        <div
          style={{
            fontSize: '13px',
            letterSpacing: '-2px'
          }}
        >
          &#9733;
        </div>
      );
      numberOfGrayStars--;
      numberOfBlackStars--;
    }

    while (numberOfGrayStars > 0) {
      scoreDisplay.push(
        <div
          style={{
            color: 'gray',
            fontSize: '13px',
            letterSpacing: '-2px'
          }}
        >
          &#9733;
        </div>
      );
      numberOfGrayStars--;
    }

    return (
      <div
        className="solid-stars"
        style={{ display: 'flex', margin: '7px 7px 0 0', color: 'rgb(51, 51, 51)' }}
      >
        {scoreDisplay}
      </div>
    );
  }
}

export default SolidReviewStars;
