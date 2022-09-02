import React from "react";

const AddReviewBtn = ({ toggleModal }) => {
  return (
    <button className="RR_review-btn" onClick={() => toggleModal()}>
      ADD A REVIEW +
    </button>
  );
};

export default AddReviewBtn;
