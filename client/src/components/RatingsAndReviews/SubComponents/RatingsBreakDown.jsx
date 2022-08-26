import React from "react";

class RatingsBreakDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avg: 0,
      meta: this.props.meta,
    };
  }

  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////

  render() {
    return (
      <div id="RR_break-down-container">
        <p>Ratings BreakDown</p>
        <h2>
          {(
            this.props.reviewStats.starTotal / this.props.reviewStats.voteTotal
          ).toFixed(1)}{" "}
          stars
        </h2>
        <div>
          <div>
            5 stars:{" "}
            {this.props.meta.ratings
              ? Object.values(this.props.meta.ratings)[0]
              : 0}
          </div>
          <div>
            4 stars:{" "}
            {this.props.meta.ratings
              ? Object.values(this.props.meta.ratings)[1]
              : 0}
          </div>{" "}
          <div>
            3 stars:{" "}
            {this.props.meta.ratings
              ? Object.values(this.props.meta.ratings)[2]
              : 0}
          </div>{" "}
          <div>
            2 stars:{" "}
            {this.props.meta.ratings
              ? Object.values(this.props.meta.ratings)[3]
              : 0}
          </div>{" "}
          <div>
            1 stars:{" "}
            {this.props.meta.ratings
              ? Object.values(this.props.meta.ratings)[4]
              : 0}
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsBreakDown;
