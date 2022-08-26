import React from "react";
import { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem.jsx";

// class ReviewsList extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     // let reviewArr = [];
//     // this.props.reviews.forEach((el) => {
//     //   reviewArr.push(<ReviewItem review={el} />);
//     // });
//     return (
//       <div id="RR_reviews-list">
//         <p>Reviews List</p>
//         <div>
//           {this.props.reviews.map((el, i) => {
//             return <ReviewItem key={i} review={el} />;
//           })}
//         </div>
//       </div>
//     );
//   }
// }

//props = reviews, id
let ReviewsList = ({ reviews, id }) => {
  const [reviewsList, setReviewsList] = useState({});
  useEffect(() => {
    setReviewsList(reviews);
  }, [reviews]);

  return (
    <div id="RR_reviews-list">
      <p>Reviews List</p>
      <div>
        {Object.keys(reviewsList).length
          ? reviewsList.map((el, i) => {
              return <ReviewItem key={i} review={el} />;
            })
          : null}
      </div>
    </div>
  );
};

export default ReviewsList;
