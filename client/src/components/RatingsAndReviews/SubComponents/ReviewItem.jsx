import React from "react";
import { useState } from "react";

//under each image is an invisible element which does not take up space on the dom. when the thumbnail for that image is clicked the respective modal version of that thumbnail has the class that hides it, removed.

const toggleModal = (e, id) => {
  e.preventDefault();
  let reviewImgModal = document.getElementById(`RR_modal-container-${id}`);
  reviewImgModal.classList.toggle("RR_display-none");
};

const ReviewItem = (props) => {
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
                <div key={`${photo.id}`}>
                  <img
                    onClick={(e) => toggleModal(e, photo.id)}
                    className="RR_review-thumbnail"
                    alt="user submitted image"
                    src={`${photo.url}`}
                  />
                  <div
                    id={`RR_modal-container-${photo.id}`}
                    className="RR_display-none RR_modal-container"
                    onClick={(e) => toggleModal(e, photo.id)}
                  >
                    <img className="RR_modal-image" src={`${photo.url}`} />
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </li>
  );
};

export default ReviewItem;
