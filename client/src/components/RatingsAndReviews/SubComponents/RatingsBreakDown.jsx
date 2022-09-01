import React from "react";
import { useState, useEffect } from "react";
import { Star } from "react-feather";

//props = reviewStats, meta, id
let RatingsBreakDown = (props) => {
  // state, fn to edit state = hook (initial val)
  const [avg, setAvg] = useState(0);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    setAvg(
      (props.reviewStats.starTotal / props.reviewStats.voteTotal).toFixed(1)
    );
    setMeta(props.meta);
  }, [props]);

  let width = (avg / 5) * 100; // percent rating
  //display full stars in one color
  //display filled in stars to specified width (%) in darger color

  return (
    <div id="RR_break-down-container">
      <p>Ratings BreakDown</p>
      <h2 id="RR_star-avg">
        {props.reviewStats.starTotal
          ? (props.reviewStats.starTotal / props.reviewStats.voteTotal).toFixed(
              1
            )
          : null}{" "}
        stars
      </h2>
      <div className="RR_ratings-bd-list">
        {props.meta.ratings
          ? [5, 4, 3, 2, 1].map((starNum, i) => {
              return (
                <div id="RR_ratings-bd-count" key={starNum}>
                  {starNum}: {Object.values(props.meta.ratings)[starNum - 1]}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default RatingsBreakDown;
