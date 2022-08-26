import React from "react";

class RatingsBreakDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avg: 0,
      meta: this.props.meta,
    };
  }

  // let RatingsBreakDown = (props) => {
  //   // state, fn to edit state = hook (initial val)
  //   const [state, setState] = useState(0)
  // }

  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////

  render() {
    return (
      <div id="RR_break-down-container">
        <p>Ratings BreakDown</p>
        <h2 id="RR_star-avg">
          {this.props.reviewStats.starTotal
            ? (
                this.props.reviewStats.starTotal /
                this.props.reviewStats.voteTotal
              ).toFixed(1)
            : null}{" "}
          stars
        </h2>
        <div className="RR_ratings-bd-list">
          {this.props.meta.ratings
            ? [5, 4, 3, 2, 1].map((starNum, i) => {
                return (
                  <div id="RR_ratings-bd-count" key={starNum}>
                    {starNum}:{" "}
                    {Object.values(this.props.meta.ratings)[starNum - 1]}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default RatingsBreakDown;
