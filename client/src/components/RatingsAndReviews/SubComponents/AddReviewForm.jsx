import React from "react";
import { useState, useContext } from "react";
import RatingStars from "../../Overview/ProductDetails/RatingStars.jsx";
import ReviewFormRadio from "./ReviewFormRadio.jsx";
import ProductContext from "../../App.jsx";
import { postNewReview } from "../../Utilities/Atelier.jsx";
import axios from "axios";

const AddReviewForm = ({ id, meta }) => {
  console.log(meta);
  const [userRating, setUserRating] = useState(0);
  const [reviewCharacteristics, setReviewCharacteristics] = useState({});
  const [recommend, setRecommend] = useState(null);
  const [userImgs, setUserImgs] = useState([]);
  const [summary, setSummary] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = (e) => {
    let userScore = e.target.getAttribute("attr");
    setUserRating(Number(userScore));
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "summary":
        setSummary(e.target.value);
        break;
      case "body":
        setReviewBody(e.target.value);
        break;
      case "userName":
        setUserName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "characteristics":
        console.log(e.target.dataset.charid, e.target.dataset.charval);
        let copy = reviewCharacteristics;
        reviewCharacteristics[e.target.dataset.charid] = Number(
          e.target.dataset.charval
        );
        setReviewCharacteristics(copy);
        break;
    }
  };

  const handleRecommend = (e) => {
    e.target.value === "yes" ? setRecommend(true) : setRecommend(false);
  };

  const handleImgUpload = (e) => {
    let tempURLs = [];
    Object.values(e.target.files).map((file) => {
      let imgURL = URL.createObjectURL(file);
      tempURLs.push(imgURL);
    });
    if (userImgs.length + tempURLs.length > 5) {
      alert("Sorry, there is a maximum of 5 images allowed per review");
      setUserImgs(userImgs);
      return;
    } else if (userImgs.length + tempURLs.length === 5) {
      setUserImgs([...userImgs, ...tempURLs]);
    } else {
      setUserImgs([...userImgs, ...tempURLs]);
    }
  };

  const handleSubmit = (e) => {
    let userReview = {
      product_id: id,
      rating: userRating,
      summary: summary,
      body: reviewBody,
      recommend: recommend,
      name: userName,
      email: email,
      photos: [],
      characteristics: reviewCharacteristics,
    };

    console.log("posting", userReview);
    axios
      .post(`${ATELIER_API}/reviews`, userReview, {
        headers: { Authorization: process.env.KEY },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  let userRatingTerms = {
    1: "Poor",
    2: "Fair",
    3: "Average",
    4: "Good",
    5: "Great",
  };

  console.log("////", meta.characteristics);
  let characteristics = Object.keys(meta.characteristics);
  var charIDs = Object.values(meta.characteristics).map((char) => char.id);
  console.log(charIDs);

  return (
    <div className="RR_modal-form">
      <h3 id="RR_review-form-title">Write a Review for "PRODUCT???"</h3>
      <div>
        <span>Overall Rating</span>
        <div onClick={(e) => handleClick(e)}>
          <RatingStars rating={userRating} />
          {userRating ? <span>{userRatingTerms[userRating]}</span> : null}
        </div>
      </div>
      <form>
        <p>Do you recommend this product ?</p>
        <div onChange={(e) => handleRecommend(e)}>
          <input type="radio" id="yes" name="recommend" value="yes"></input>
          <label htmlFor="yes">Yes</label>
          <input type="radio" id="no" name="recommend" value="no"></input>
          <label htmlFor="no">No</label>
        </div>
      </form>
      <div>
        {characteristics.map((char, i) => {
          return (
            <div key={`${char}`}>
              <ReviewFormRadio
                chars={characteristics}
                charId={charIDs[i]}
                char={char}
                index={i}
                handleChange={handleChange}
              />
            </div>
          );
        })}
      </div>
      <div className="RR_user-review-summary-container">
        <span>Review Summary</span>
        <form>
          <input
            className="RR_user-review-summary"
            type="text"
            placeholder="Example: Best purchase ever"
            id="summary"
            value={summary}
            onChange={(e) => handleChange(e)}
            maxLength="60"
          ></input>
        </form>
      </div>
      <div className="RR_user-review-body-container">
        <form>
          <textarea
            className="RR_user-review-body"
            type="text"
            rows="30"
            cols="55"
            id="body"
            value={reviewBody}
            placeholder="Why did you like the product or not?"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </form>
        <div>
          {50 - reviewBody.length >= 0 ? (
            <span>
              Minimum required characters left: {50 - reviewBody.length}
            </span>
          ) : (
            <span>Minimum reached</span>
          )}
        </div>
      </div>
      <div>
        <div>
          {userImgs.length && userImgs.length >= 5 ? null : (
            <input
              type="file"
              id="files"
              multiple="multiple"
              accept="image/*"
              onChange={(e) => handleImgUpload(e)}
            ></input>
          )}
        </div>
        <div>
          {userImgs.length
            ? userImgs.map((img, i) => {
                return <img className="RR_form-thumbnail" src={img} key={i} />;
              })
            : null}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Example: jackson11!"
          maxLength="60"
          value={userName}
          id="userName"
          onChange={(e) => handleChange(e)}
        ></input>
        <small>
          For privacy reasons, do not use your full name or email address
        </small>
      </div>
      <div>
        <input
          type="email"
          placeholder="Example: jackson11@email.com"
          maxLength="60"
          value={email}
          id="email"
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </div>
  );
};

export default AddReviewForm;

//can do max chars with input type=text not with textarea
//createObjectURL(object)

//obj of keys {"charID":1, "charID":5}
