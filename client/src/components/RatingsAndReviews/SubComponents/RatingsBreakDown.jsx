import React from "react";
import { useState, useEffect } from "react";
import RatingStars from "../../Overview/ProductDetails/RatingStars.jsx";
import SingleBreakDown from "./SingleBreakDown.jsx";
import ProductFactor from "./ProductFactor.jsx";

//props = reviewStats, meta, id
let RatingsBreakDown = (props) => {
  // state, fn to edit state = hook (initial val)
  const [avg, setAvg] = useState(0);
  const [meta, setMeta] = useState({});

  const starTotal = props.reviewStats.starTotal;
  const voteTotal = props.reviewStats.voteTotal;

  useEffect(() => {
    setAvg((starTotal / voteTotal).toFixed(1));
    setMeta(props.meta);
  }, [props]);

  let avgWidth = (avg / 5) * 100; // percent rating
  let currProductRating = props.reviewStats.starTotal
    ? (props.reviewStats.starTotal / props.reviewStats.voteTotal).toFixed(1)
    : null;

  return (
    <div id="RR_break-down-container">
      <div id="RR_star-avg">
        <h2>{currProductRating} </h2>
        <RatingStars rating={currProductRating} />
      </div>
      <div className="RR_ratings-bd-list">
        {props.meta.ratings
          ? [5, 4, 3, 2, 1].map((starNum, i) => {
              return (
                <SingleBreakDown
                  meta={props.meta}
                  starNum={starNum}
                  starTotal={starTotal}
                  voteTotal={voteTotal}
                  key={i}
                  // onClick={applyStarFilter}
                />
              );
            })
          : null}
      </div>
      <div className="RR_product-factors">
        {Object.keys(props.meta).length > 0
          ? Object.keys(props.meta.characteristics).map((factor, i) => {
              return (
                <ProductFactor
                  key={i}
                  factor={factor}
                  factorVal={props.meta.characteristics[factor]}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default RatingsBreakDown;
