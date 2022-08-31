import React from "react";
import { useState } from "react";
import axios from "axios";
import ATELIER_API from "../utilities/utilities.js";

const HelpfulnessAndReport = ({ review }) => {
  const [canVote, setCanVote] = useState({ voted: false });

  //going to need to make put/post req for these...
  let handleHelpful = (e, id) => {
    console.log(process.env.KEY);
    // console.log(id);
    axios
      .put(`${ATELIER_API}/reviews/:review_id/helpful`, {
        params: {
          review_id: id,
        },
        headers: { Authorization: process.env.KEY },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  let handleReport = (e, id) => {
    // console.log(id);
    axios
      .put(`${ATELIER_API}/reviews/:review_id/report`, {
        params: {
          review_id: id,
        },
        headers: { Authorization: process.env.KEY },
      })
      .then((res) => console.log(res))
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
          YES ({`${review.helpfulness}`}){" "}
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
