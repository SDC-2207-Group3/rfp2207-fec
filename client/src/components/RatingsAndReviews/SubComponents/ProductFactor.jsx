import React from "react";

const ProductFactor = ({ factor, factorVal }) => {
  console.log("/////", factor, factorVal.value);
  //size width comfort quality length fit
  //5 point scale for each

  //size: too small perfect too big
  //width: too small perfect too big
  //comfort: not comfortable comfortable
  //quality: poor excellent
  //length: too short perfect too long
  //fit: too small, perfect, too big

  //assume width of this element is the same 200px as above el
  let width = (Number(factorVal.value) / 5) * 100;
  return (
    <div className="RR_factor-bar-container">
      <span>{factor}</span>
      <div className="RR_factor-bar">
        <div className="RR_factor-bar-icon" style={{ width: `${width}%` }}>
          &#9660;
        </div>
      </div>
      <div>
        {factor === "Size" ? (
          <div className="RR_factor-phrases">
            <span>too small</span>
            <span>perfect</span>
            <span>too big</span>
          </div>
        ) : null}
      </div>
      <div>
        {factor === "Width" ? (
          <div className="RR_factor-phrases">
            <span>too small</span>
            <span>perfect</span>
            <span>too big</span>
          </div>
        ) : null}
      </div>{" "}
      <div>
        {factor === "Comfort" ? (
          <div className="RR_factor-phrases">
            <span>not comfortable</span>
            <span>comfortable</span>
          </div>
        ) : null}
      </div>{" "}
      <div>
        {factor === "Quality" ? (
          <div className="RR_factor-phrases">
            <span>poor</span>
            <span>excellent</span>
          </div>
        ) : null}
      </div>{" "}
      <div>
        {factor === "Length" ? (
          <div className="RR_factor-phrases">
            <span>too short</span>
            <span>perfect</span>
            <span>too long</span>
          </div>
        ) : null}
      </div>{" "}
      <div>
        {factor === "Fit" ? (
          <div className="RR_factor-phrases">
            <span>too small</span>
            <span>perfect</span>
            <span>too big</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductFactor;
