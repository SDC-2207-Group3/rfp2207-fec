import React from "react";
import axios from "axios";
import utilities from "./utilities/utilities.js";
import Sort from "./SubComponents/Sort.jsx";
import RatingsBreakDown from "./SubComponents/RatingsBreakDown.jsx";
import ReviewsList from "./SubComponents/ReviewsList.jsx";
import { useState, useEffect, useReducer } from "react";

let RatingsAndReviewsMain = (props) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [id, setId] = useState(props.id);
  const [sortBy, setSortBy] = useState("relevant");
  const [displayedReviews, setDisplayedReviews] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [reviewStats, setReviewStats] = useState({});
  const [showMoreBtn, setShowMoreBtn] = useState(true);

  //this could be a context hook...
  let swapSort = (sort) => {
    setSortBy(sort);
  };

  //this could be moved to utilities later ~~~~~~~~~~~~~
  let showMoreReviews = () => {
    axios
      .get(`${utilities.ATELIER_API}/reviews`, {
        params: {
          product_id: `${id}`,
          sort: `${sortBy}`,
          count: `${displayedReviews + 2}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      .then((res) => {
        if (res.data.count > res.data.results.length) {
          setShowMoreBtn(false);
        } else {
          setReviews(res.data.results);
          setDisplayedReviews(displayedReviews + 2);
        }
      })
      .catch((err) => console.log(err));
  };

  let fetchData = () => {
    axios
      .get(`${utilities.ATELIER_API}/reviews`, {
        params: {
          product_id: `${id}`,
          sort: `${sortBy}`,
          count: `${displayedReviews}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      //res.data.results = arr of reviews
      .then((res) => {
        //update state
        setReviews(res.data.results);
      })
      .then(() => {
        // get meta data for current product
        return axios.get(`${utilities.ATELIER_API}/reviews/meta`, {
          params: { product_id: `${id}` },
          headers: { Authorization: process.env.KEY },
        });
      })
      .then((res) => {
        let reviewStatsObj = utilities.getAvgReviewValue(res.data);

        setMeta(res.data);
        setReviewStats(reviewStatsObj);
      })
      .catch((err) => console.log("failed to fetch", err));
  };

  //when props update, call fetchData
  useEffect(() => {
    fetchData();
  }, []);

  //when sort method changes, re-render reviews
  useEffect(() => {
    fetchData();
  }, [sortBy]);

  return (
    <section id="section_rr">
      <h2>Ratings and Reviews</h2>
      <div id="RR_bd-sort-list-container">
        <RatingsBreakDown reviewStats={reviewStats} meta={meta} id={id} />
        <div id="RR_sort-list-container">
          <Sort sortMethod={sortBy} swapSort={swapSort} id={props.id} />
          <ReviewsList
            showMoreBtn={showMoreBtn}
            reviews={reviews}
            id={props.id}
            showMoreReviews={showMoreReviews}
          />
        </div>
      </div>
    </section>
  );
};

export default RatingsAndReviewsMain;

/* KNOWN BUGS / TODO

  when rendering 2 or fewer reviews, do not render the show more button

  some kind of discrepancy in helpfulness value, likely caused by state vs db value... values on page seem to modify when re rendered.

  relevant & helpful may not be changing their sort, am i meant to make the logic behind these sorting conditions???

  no way of knowing if response from seller functionality works? background still red btw

  break down review item subcomponent into more componenents
*/
