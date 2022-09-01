import React from "react";
import { Star } from "react-feather";

const StarsContainer = ({ meta, starTotal, voteTotal }) => {
  console.log(meta);
  return (
    <div className="RR_star-container">
      <div className="RR_stars">
        {[...Array(5)].map((star, i) => (
          <Star key={i} className="RR_star" />
        ))}
      </div>
      <div className="RR_star-cover" /*style={{ width: `${width}%` }}*/>
        {/* {[...Array(5)].map((star, i) => (
      <Star key={i} className="RR_star-c" />
    ))} */}
      </div>
    </div>
  );
};

export default StarsContainer;
