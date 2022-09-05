import React from "react";

const SingleBreakDown = ({ meta, starNum, starTotal, voteTotal }) => {
  let currStarTotal = meta.ratings[starNum];
  let percentWidth = ((currStarTotal / voteTotal) * 100).toFixed(1);
  //extra check to make sure if no rating exists the green bar doesnt fill
  meta.ratings[starNum] === undefined ? (percentWidth = 0) : null;

  //setting bar at 200 px, so percentWidth * 2
  return (
    <div id="RR_ratings-bd-count" key={starNum}>
      <span>{starNum} stars: </span>
      <div id="RR_ratings-bars-container">
        <div className="RR_ratings-bar-full">
          <div
            className="RR_ratings-bar"
            style={{ width: `${2 * percentWidth}px` }}
          ></div>
        </div>
      </div>
      <span className="RR_star-total-count">{currStarTotal || 0}</span>
    </div>
  );
};

export default SingleBreakDown;
