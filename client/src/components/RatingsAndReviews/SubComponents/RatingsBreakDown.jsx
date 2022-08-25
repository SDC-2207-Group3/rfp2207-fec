import React from "react";

class RatingsBreakDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: this.props.meta,
    };
  }

  ////////////////////////////////////////////////////////////

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
