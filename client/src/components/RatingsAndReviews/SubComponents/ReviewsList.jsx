import React from "react";
import { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem.jsx";
import AddReviewBtn from "./AddReviewBtn.jsx";

//props boolean, arr, str, fn
let ReviewsList = ({
  showMoreBtn,
  reviews,
  id,
  showMoreReviews,
  toggleModal,
}) => {
  const [reviewsList, setReviewsList] = useState(reviews);

  useEffect(() => {
    setReviewsList(reviews);
  }, [reviews]);

  return (
    <div id="RR_reviews-list">
      <h3>Reviews</h3>
      {reviews.length ? null : <AddReviewBtn toggleModal={toggleModal} />}
      <div>
        {reviewsList.map((review, i) => {
          return <ReviewItem key={i} review={review} />;
        })}
      </div>
      <div id="RR_review-btns-container">
        {showMoreBtn ? (
          <button className="RR_review-btn" onClick={() => showMoreReviews()}>
            MORE REVIEWS
          </button>
        ) : null}
        {reviews.length ? <AddReviewBtn toggleModal={toggleModal} /> : null}
      </div>
    </div>
  );
};

export default ReviewsList;
