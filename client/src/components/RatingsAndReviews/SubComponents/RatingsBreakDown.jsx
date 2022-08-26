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
  //   console.log("GET AVG STARS");
  //   for (let [star, count] of Object.entries(this.props.meta.ratings)) {
  //     console.log(star, count);
  //   }
  // }

  componentDidUpdate() {
    console.log("GET AVG STARS");
    console.log(this.state.meta);
    console.log(this.props.meta.ratings);
    // for (let [star, count] of Object.entries(this.props.meta.ratings)) {
    //   console.log(star, count);
    // }
  }

  ////////////////////////////////////////////////////////////

  render() {
    // this.getAvgReviewValue();
    return (
      <div id="RR_break-down-container">
        <p>Ratings BreakDown</p>
      </div>
    );
  }
}

export default RatingsBreakDown;
