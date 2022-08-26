import React from "react";

class Sort extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="RR_sort">
        <p>Currently Sorted By {this.props.sortMethod}</p>
      </div>
    );
  }
}

export default Sort;
