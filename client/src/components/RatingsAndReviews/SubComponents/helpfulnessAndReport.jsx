import React from "react";
import { useState } from "react";

const HelpfulnessAndReport = ({ review }) => {
  const [canVote, setCanVote] = useState({ voted: false });

  //going to need to make put/post req for these...
  let handleHelpful = (e, id) => {
    console.log(id);
  };

  let handleReport = (e, id) => {
    console.log(id);
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
