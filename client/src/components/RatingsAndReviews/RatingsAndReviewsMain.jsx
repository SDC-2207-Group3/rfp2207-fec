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

let RatingsAndReviewsMain = (props) => {
  let initialState = {
    id: props.id,
    sortBy: "relevant",
    displayedReviews: 5,
    reviews: [],
    meta: {},
    reviewStats: {},
    showMoreBtn: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  let swapSort = (sort) => {
    dispatch({
      type: "setSort",
      setSort: sort,
    });
    //state is getting updated, but not before fetchData calls on the previous state... with the previous sort method....
    // fetchData(state);
  };

  //this could be moved to utilities later ~~~~~~~~~~~~~
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
    console.log("FETCH DATA");
    console.log(state);
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
        let reviewStatsObj = utilities.getAvgReviewValue(res.data);

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

  //when props update, call fetchData
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
          <Sort sortMethod={state.sortBy} swapSort={swapSort} id={props.id} />
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

  some kind of discrepancy in helpfulness value, likely caused by state vs db value... values on page seem to modify when re rendered.

  break down review item subcomponent into more componenents
*/
