import React from "react";

var ReviewItem = (props) => {
  return (
    <li className="RR_list-item">
      <p>username: {props.review.reviewer_name}</p>
      <span>posted: {props.review.date}</span>
      <h4>{props.review.summary}</h4>
      <p>{props.review.body}</p>
    </li>
  );
};

export default ReviewItem;
