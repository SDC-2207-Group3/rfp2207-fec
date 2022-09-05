import React from "react";
import { useState, useEffect } from "react";
import StarsContainer from "./StarsContainer.jsx";
import SingleBreakDown from "./SingleBreakDown.jsx";
import ProductFactor from "./ProductFactor.jsx";

//props = reviewStats, meta, id
let RatingsBreakDown = (props) => {
  console.log("RR BD", props);
  // state, fn to edit state = hook (initial val)
  const [avg, setAvg] = useState(0);
  const [meta, setMeta] = useState({});

  //meta.characteristics = {comfort: {id: x, value: y}, quality: {},}

  const starTotal = props.reviewStats.starTotal;
  const voteTotal = props.reviewStats.voteTotal;

  useEffect(() => {
    setAvg((starTotal / voteTotal).toFixed(1));
    setMeta(props.meta);
  }, [props]);

  let avgWidth = (avg / 5) * 100; // percent rating
  //display full stars in one color
  //display filled in stars to specified width (%) in darger color
  //2 divs, one rendering 5 stars and one rendering over those with a width

  return (
    <div id="RR_break-down-container">
      <div id="RR_star-avg">
        <h2>
          {props.reviewStats.starTotal
            ? (
                props.reviewStats.starTotal / props.reviewStats.voteTotal
              ).toFixed(1)
            : null}{" "}
        </h2>
        <StarsContainer
          meta={props.meta}
          starTotal={starTotal}
          voteTotal={voteTotal}
        />
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
