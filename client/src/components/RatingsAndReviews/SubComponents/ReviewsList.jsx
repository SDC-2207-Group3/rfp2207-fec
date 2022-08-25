import React from "react";
import ReviewItem from "./ReviewItem.jsx";

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="RR_reviews-list">
        <p>Reviews List</p>
        <ReviewItem />
      </div>
    );
  }
}

export default ReviewsList;
