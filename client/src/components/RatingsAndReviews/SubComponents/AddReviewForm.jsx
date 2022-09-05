import React from "react";
import { useState } from "react";
import RatingStars from "../../Overview/ProductDetails/RatingStars.jsx";

const AddReviewForm = ({ meta }) => {
  console.log(meta, "....");
  const [userRating, setUserRating] = useState(0);

  const handleClick = (e) => {
    let userScore = e.target.getAttribute("attr");
    setUserRating(userScore);
  };

  let userRatingTerms = {
    1: "Poor",
    2: "Fair",
    3: "Average",
    4: "Good",
    5: "Great",
  };

  let characteristics = Object.keys(meta.characteristics);
  console.log(characteristics);

  return (
    <div className="RR_modal-form">
      <h3 id="RR_review-form-title">Write a Review for "PRODUCT???"</h3>
      <div>
        <span>Overall Rating</span>
        <div onClick={(e) => handleClick(e)}>
          <RatingStars rating={userRating} />
          {userRating ? <span>{userRatingTerms[userRating]}</span> : null}
        </div>
      </div>
      <form>
        <p>Do you recommend this product ?</p>
        <div>
          <input type="radio" id="yes" name="recommend" value="yes"></input>
          <label htmlFor="yes">Yes</label>
          <input type="radio" id="no" name="recommend" value="no"></input>
          <label htmlFor="no">No</label>
        </div>
      </form>
      <form>
        <div>
          {characteristics.map((char) => {
            return (
              <div key={`${char}`}>
                <span>{char}</span>
                <input
                  type="radio"
                  name={`${char}-form`}
                  value={`${char}`}
                ></input>
                <input
                  type="radio"
                  name={`${char}-form`}
                  value={`${char}`}
                ></input>
                <input
                  type="radio"
                  name={`${char}-form`}
                  value={`${char}`}
                ></input>
                <input
                  type="radio"
                  name={`${char}-form`}
                  value={`${char}`}
                ></input>
                <input
                  type="radio"
                  name={`${char}-form`}
                  value={`${char}`}
                ></input>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
