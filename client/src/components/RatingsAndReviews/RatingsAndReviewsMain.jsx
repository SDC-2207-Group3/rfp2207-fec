import React from "react";
import axios from "axios";
import utilities from "./utilities/utilities.js";
import Sort from "./SubComponents/Sort.jsx";
import RatingsBreakDown from "./SubComponents/RatingsBreakDown.jsx";
import ReviewsList from "./SubComponents/ReviewsList.jsx";
import { useState, useEffect, useReducer } from "react";

let reducer = (state, action) => {
  switch (action.type) {
    case "setId":
      return { ...state, id: action.setId };
    case "setSort":
      return { ...state, sortBy: action.setSort };
    case "setDisplayedReviews":
      return { ...state, displayedReviews: action.setDisplayedReviews };
    case "setReviews":
      return { ...state, reviews: action.setReviews };
    case "setMeta":
      return { ...state, meta: action.setMeta };
    case "setReviewStats":
      return { ...state, reviewStats: action.setReviewStats };
    case "setShowMoreBtn":
      return { ...state, showMoreBtn: action.setShowMoreBtn };
    default:
      return state;
  }
};

let getAvgReviewValue = (meta) => {
  let statsObj = {};
  statsObj.starTotal = 0;
  statsObj.voteTotal = 0;
  for (let [star, count] of Object.entries(meta.ratings)) {
    statsObj.starTotal += star * count;
    statsObj.voteTotal += Number(count);
  }
  return statsObj;
};

//should make axios request, then instead of setting state
//call reducer to set state for us

let RatingsAndReviewsMain = (props) => {
  let initialState = {
    id: props.id,
    // selectedItem: {},
    sortBy: "newest",
    displayedReviews: 2,
    reviews: [],
    meta: {},
    reviewStats: {},
    showMoreBtn: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  let showMoreReviews = () => {
    return axios
      .get(`${utilities.ATELIER_API}/reviews`, {
        params: {
          product_id: `${state.id}`,
          sort: `${state.sortBy}`,
          count: `${state.displayedReviews + 2}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      .then((res) => {
        if (res.data.count > res.data.results.length) {
          dispatch({
            type: "setShowMoreBtn",
            setShowMoreBtn: false,
          });
        } else {
          dispatch({
            type: "setReviews",
            setReviews: res.data.results,
          });
          dispatch({
            type: "setDisplayedReviews",
            setDisplayedReviews: state.displayedReviews + 2,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  let fetchData = (state) => {
    axios
      .get(`${utilities.ATELIER_API}/reviews`, {
        params: {
          product_id: `${state.id}`,
          sort: `${state.sortBy}`,
          count: `${state.displayedReviews}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      //res.data.results = arr of reviews
      .then((res) => {
        //update state
        dispatch({
          type: "setReviews",
          setReviews: res.data.results,
        });
      })
      .then(() => {
        // get meta data for current product
        return axios.get(`${utilities.ATELIER_API}/reviews/meta`, {
          params: { product_id: `${state.id}` },
          headers: { Authorization: process.env.KEY },
        });
      })
      .then((res) => {
        let reviewStatsObj = getAvgReviewValue(res.data);

        dispatch({
          type: "setMeta",
          setMeta: res.data,
        });
        dispatch({
          type: "setReviewStats",
          setReviewStats: reviewStatsObj,
        });
      })
      .catch((err) => console.log("failed to fetch", err));
  };

  useEffect(() => {
    fetchData(state);
  }, []);

  return (
    <section id="section_rr">
      <h2>Ratings and Reviews</h2>
      <div id="RR_bd-sort-list-container">
        <RatingsBreakDown
          reviewStats={state.reviewStats}
          meta={state.meta}
          id={props.id}
        />
        <div id="RR_sort-list-container">
          <Sort sortMethod={state.sortBy} id={props.id} />
          <ReviewsList
            showMoreBtn={state.showMoreBtn}
            reviews={state.reviews}
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

  unsure if the data im getting from the api is sorted properly, ill know more once i fix the dates, for now things seem to be placing into the reviews list rather than on the top or bottom of the review list -- sometimes?

  unhappy with the complexity of the review item component. should look at breaking that down into simpler components during a refactor


*/
