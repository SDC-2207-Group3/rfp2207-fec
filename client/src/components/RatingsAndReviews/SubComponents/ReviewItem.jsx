import React from "react";
import { useState } from "react";
import HelpfulnessAndReport from "./helpfulnessAndReport.jsx";
import utilities from "../utilities/utilities.js";

//under each image is an invisible element which does not take up space on the dom. when the thumbnail for that image is clicked the respective modal version of that thumbnail has the class that hides it, removed.
//this one module is handling the entire rendering of everything on each review list element. im not sure if i should break this up into further sub components but that would likely be a good idea for refactoring...

//maybe i could have done modal rendering with state?
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
      <span>posted: {utilities.getFormattedDate(props.review.date)}</span>
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
      <div className="RR_review-photo-container">
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
      <div className="RR_response-from-seller">
        {props.review.response !== null ? (
          <span>{`response from seller: ${props.review.response}`}</span>
        ) : null}
      </div>
      <HelpfulnessAndReport review={props.review} />
    </li>
  );
};

export default ReviewItem;
