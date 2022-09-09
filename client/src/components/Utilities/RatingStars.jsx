import React, { useContext } from "react";
import { ProductContext } from "./../App.jsx";

const RatingStars = (props) => {
  const productRating = props.rating;

  const { darkMode } = useContext(ProductContext);

  let ratingStars = [0, 0, 0, 0, 0];
  ratingStars = ratingStars.map((star, index) => {
    const pos = index * 20 + "%";
    const starPosition = { left: pos };

    if (index + 1 <= Math.floor(productRating)) {
      return (
        <div key={index} className="star-container">
          <i className="fa-solid fa-star star-fill" attr={index + 1}></i>
        </div>
      );
    } else if (index + 1 - productRating < 1) {
      const fillColor = darkMode ? "#3a3a3a" : "white";
      const fillClass = "rating-slider " + (darkMode ? "darkMode" : "lightMode");
      const percentageFill = (index + 1 - productRating) * 100 + "%";
      const fill = {
        width: percentageFill,
      };
      return (
        <div key={index} className="star-container">
          <i className="fa-solid fa-star star-fill" attr={index + 1}></i>
          <i className="fa-regular fa-star star-empty" attr={index + 1}></i>
          <div className={fillClass} style={fill}></div>
        </div>
      );
    } else if (index + 1 > productRating) {
      return (
        <div key={index} className="star-container">
          <i className="fa-regular fa-star star-empty" attr={index + 1}></i>
        </div>
      );
    }
  });

  return <div className="rating">{ratingStars}</div>;
};

export default RatingStars;
