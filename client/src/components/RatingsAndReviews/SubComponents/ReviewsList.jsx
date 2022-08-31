import React from "react";
import { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem.jsx";

//props boolean, arr, str, fn
let ReviewsList = ({ showMoreBtn, reviews, id, showMoreReviews }) => {
  const [reviewsList, setReviewsList] = useState(reviews);

  useEffect(() => {
    setReviewsList(reviews);
  }, [reviews]);

  return (
    <div id="RR_reviews-list">
      <p>Reviews List</p>
      <div>
        {reviewsList.map((review, i) => {
          return <ReviewItem key={i} review={review} />;
        })}
      </div>
      {showMoreBtn ? (
        <button onClick={() => showMoreReviews()}>show more</button>
      ) : null}
    </div>
  );
};

export default ReviewsList;
