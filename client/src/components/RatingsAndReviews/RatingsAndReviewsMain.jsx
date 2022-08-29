import React from "react";
import axios from "axios";
import ATELIER_API from "./utilities/utilities.js";
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
    // case "setAll":
    //   return {
    //     id: action.setId,
    //     sortBy: action.sortBy,
    //     displayedReviews: action.displayedReviews,
    //     reviews: action.setReviews,
    //     meta: action.setMeta,
    //     reviewStats: action.setReviewStats,
    //   };
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

  //may want to pass dispatch down as props or something?

  //display with x reviews
  //each time "show more is clicked"
  //display x+2 reviews
  //if x+2 reviews count = reviews count remove show more btn

  const [state, dispatch] = useReducer(reducer, initialState);

  let showMoreReviews = () => {
    return axios
      .get(`${ATELIER_API}/reviews`, {
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
    console.log(state);
  };

  let fetchData = (state) => {
    axios
      .get(`${ATELIER_API}/reviews`, {
        params: {
          product_id: `${state.id}`,
          sort: `${state.sortBy}`,
          count: `${state.displayedReviews}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      //res.data.results = arr of reviews
      .then((res) => {
        console.warn(res);
        //update state
        dispatch({
          type: "setReviews",
          setReviews: res.data.results,
        });
      })
      .then(() => {
        console.warn("meta call");
        // get meta data for current product
        return axios.get(`${ATELIER_API}/reviews/meta`, {
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
