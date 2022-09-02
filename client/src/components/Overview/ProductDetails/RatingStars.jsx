import React from 'react';

const RatingStars = (props) => {

  const statePR = props.statePR;
  const productRating = calcProductRating(statePR);

  function calcProductRating(productRating) {
    if (typeof productRating !== 'object') { return }
    const ratings = Object.keys(productRating);
    const counts  = Object.values(productRating);
    const totalCount = counts.reduce((memo, count) => memo += parseInt(count), 0);
    const totalReviews = ratings.map((rating, index) => parseInt(rating) * parseInt(counts[index])).reduce((memo, rating) => memo += rating, 0);
    return (totalReviews/totalCount).toFixed(2);
  }


  let ratingStars = [0, 0, 0, 0, 0]
  ratingStars = ratingStars.map((star, index) => {
    const pos = (index * 20) + '%';
    const starPosition = { left: pos }

    if (index + 1 <= Math.floor(productRating)) {
      return (
        <div key={index} className="star-container" >
          <i className="fa-solid fa-star star-fill"></i>
        </div>
      )
    } else if ((index + 1 - productRating) < 1) {
      const percentageFill = (index + 1 - productRating) * 100 + '%'
      const fill = { width: percentageFill };
      return (
        <div key={index} className="star-container" >
            <i className="fa-solid fa-star star-fill"></i>
            <i className="fa-regular fa-star star-empty"></i>
            <div className="rating-slider" style={fill}></div>
        </div>
      )
    } else if (index + 1 > productRating) {
      return (
        <div key={index} className="star-container" >
          <i className="fa-regular fa-star star-empty"></i>
        </div>
      )
    }
  })

  return (
    <div className="rating">
      {ratingStars}
    </div>
  );
}

export default RatingStars;