import React from "react";
import { useState } from "react";

var ReviewItem = (props) => {
  const [renderBody, setRenderBody] = useState({ render: false });

  return (
    <li className="RR_list-item">
      <p>username: {props.review.reviewer_name}</p>
      <span>posted: {props.review.date}</span>
      <h4>
        {props.review.summary.length <= 60
          ? props.review.summary
          : props.review.summary.slice(0, 59) + "..."}
      </h4>
      <p className="RR_review-body">
        {props.review.body.length > 250 && !renderBody.render
          ? props.review.body.slice(0, 250) + "..."
          : props.review.body}
      </p>
      <span
        onClick={() => setRenderBody({ render: true })}
        id="RR_review-show-more"
      >
        {props.review.body.length > 250 && !renderBody.render ? (
          <button>show more</button>
        ) : null}
      </span>
      <div>
        {props.review.photos.length
          ? props.review.photos.map((photo) => {
              return (
                <img
                  key={`${photo.id}`}
                  className="RR_review-thumbnail"
                  alt="user submitted image"
                  src={`${photo.url}`}
                />
              );
            })
          : null}
      </div>
    </li>
  );
};

export default ReviewItem;
