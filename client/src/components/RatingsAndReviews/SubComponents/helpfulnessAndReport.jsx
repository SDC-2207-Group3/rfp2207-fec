import React from "react";
import { useState } from "react";
import axios from "axios";
import ATELIER_API from "../utilities/utilities.js";

const HelpfulnessAndReport = ({ review }) => {
  const [canVote, setCanVote] = useState(true);
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);

  //going to need to make put/post req for these...
  let handleHelpful = (e, id) => {
    let body = { params: { review_id: id } };

    if (canVote) {
      axios
        .put(`${ATELIER_API}/reviews/${id}/helpful`, body, {
          headers: { Authorization: process.env.KEY },
        })
        .then((res) => {
          setCanVote(false);
          setHelpfulness(helpfulness + 1);
        })
        .catch((err) => console.log(err));
    } else {
      alert("already voted for that review");
    }
  };

  let handleReport = (e, id) => {
    let body = { params: { review_id: id } };
    axios
      .put(`${ATELIER_API}/reviews/${id}/report`, body, {
        headers: { Authorization: process.env.KEY },
      })
      .then((res) => {
        //do i want to re render without the review? ehhhh
        alert(
          "Your report for this review has been successfully submitted, thank you!"
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="RR_helpful-questionaire">
      <p>
        Was this review helpful?
        <span
          className="RR_helpfulness-q"
          onClick={(e) => handleHelpful(e, review.review_id)}
        >
          {" "}
          YES ({`${helpfulness}`}){" "}
        </span>
        <span
          className="RR_report-review"
          onClick={(e) => handleReport(e, review.review_id)}
        >
          | Report
        </span>
      </p>
    </div>
  );
};

export default HelpfulnessAndReport;
