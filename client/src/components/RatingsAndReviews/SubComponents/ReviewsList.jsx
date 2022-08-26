import React from "react";
import ReviewItem from "./ReviewItem.jsx";

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let reviewArr = [];
    // this.props.reviews.forEach((el) => {
    //   reviewArr.push(<ReviewItem review={el} />);
    // });
    return (
      <div id="RR_reviews-list">
        <p>Reviews List</p>
        <div>
          {this.props.reviews.map((el, i) => {
            return <ReviewItem key={i} review={el} />;
          })}
        </div>
      </div>
    );
  }
}

export default ReviewsList;
