import React from "react";

class RatingsBreakDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avg: 0,
      meta: this.props.meta,
    };

    // this.getAvgReviewValue = this.getAvgReviewValue.bind(this);
  }

  ////////////////////////////////////////////////////////////

  // getAvgReviewValue() {
  // if (Object.keys(this.props.meta).length) {
  //   for (let [star, count] of Object.entries(this.props.meta.ratings)) {
  //     console.log(star, count);
  //   }
  // }
  // }

  //unsure if this is going to work when new props are passed down
  componentDidUpdate() {
    if (Object.keys(this.props.meta).length) {
      for (let [star, count] of Object.entries(this.props.meta.ratings)) {
        console.log(star, count);
      }
    }
  }

  ////////////////////////////////////////////////////////////

  render() {
    return (
      <div id="RR_break-down-container">
        <p>Ratings BreakDown</p>
      </div>
    );
  }
}

export default RatingsBreakDown;
