import React from "react";
import axios from "axios";
import utilities from "./utilities/utilities.js";
import Sort from "./SubComponents/Sort.jsx";
import RatingsBreakDown from "./SubComponents/RatingsBreakDown.jsx";
import ReviewsList from "./SubComponents/ReviewsList.jsx";
import AddReviewForm from "./subcomponents/AddReviewForm.jsx";
import { useState, useEffect, useReducer } from "react";

let RatingsAndReviewsMain = (props) => {
  let initialState = {
    id: props.id,
    reviews: [],
    displayedReviews: 3,
    meta: {},
    reviewStats: {},
  };

  let defaultFilter = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  };

  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState(initialState);
  // const [id, setId] = useState(props.id);
  const [sortBy, setSortBy] = useState("relevant");
  // const [displayedReviews, setDisplayedReviews] = useState(3);
  // const [reviews, setReviews] = useState([]);
  // const [meta, setMeta] = useState({});
  // const [reviewStats, setReviewStats] = useState({});
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [canRenderByRating, setCanRenderByRating] = useState(defaultFilter);

  let swapSort = (sort) => {
    //ive decided the api call for sort is working well enough
    setSortBy(sort);
  };

  let ratingsFilter = (e, starNum) => {
    console.log(starNum);
    let filterCopy = canRenderByRating;
    console.log(filterCopy);
    filterCopy[starNum] = !filterCopy[starNum];
    console.log(filterCopy);
    setCanRenderByRating(filterCopy);
  };

  useEffect(() => {
    //i cant get this to actually re render
    //it does work after you click show more, tho
    //i think this may be bc setstate is async?
    //but why is it not re rendering?
    setState({ ...state, reviews: state.reviews });
  }, [canRenderByRating]);

  let toggleModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  //this could be moved to utilities later ~~~~~~~~~~~~~
  let showMoreReviews = () => {
    // console.warn("show more of", state.id, state.displayedReviews);
    axios
      .get(`${utilities.ATELIER_API}/reviews`, {
        params: {
          product_id: `${props.id}`,
          sort: `${sortBy}`,
          count: `${state.displayedReviews + 2}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      .then((res) => {
        if (res.data.count > res.data.results.length) {
          setShowMoreBtn(false);
        } else {
          // setReviews(res.data.results);
          // setDisplayedReviews(displayedReviews + 2);
          setState({
            ...state,
            reviews: res.data.results,
            displayedReviews: state.displayedReviews + 2,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  let fetchData = (id) => {
    let tempReviews;
    axios
      .get(`${utilities.ATELIER_API}/reviews`, {
        params: {
          product_id: `${id}`,
          sort: `${sortBy}`,
          count: `${state.displayedReviews}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      //res.data.results = arr of reviews
      .then((res) => {
        tempReviews = res.data.results;
        //if less then defined amount of reviews come back
        if (tempReviews.length < state.displayedReviews) {
          //remove button to show more reviews
          setShowMoreBtn(false);
        }
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

        setState({
          ...state,
          reviews: tempReviews,
          meta: res.data,
          reviewStats: reviewStatsObj,
        });
      })
      .catch((err) => console.log("failed to fetch", err));
  };

  //when props update, call fetchData
  useEffect(() => {
    fetchData(props.id);
    setShowMoreBtn(true);
  }, [props.id]);

  //when sort method changes, çre-render reviews
  useEffect(() => {
    fetchData(props.id);
  }, [sortBy]);

  return (
    <section id="section_rr">
      <h2>Ratings and Reviews</h2>
      <div id="RR_bd-sort-list-container">
        <RatingsBreakDown
          reviewStats={state.reviewStats}
          meta={state.meta}
          id={state.id}
          ratingsFilter={ratingsFilter}
        />
        <div id="RR_sort-list-container">
          <Sort sortMethod={sortBy} swapSort={swapSort} id={state.id} />
          <ReviewsList
            showMoreBtn={showMoreBtn}
            reviews={state.reviews}
            filter={canRenderByRating}
            id={state.id}
            showMoreReviews={showMoreReviews}
            toggleModal={toggleModal}
          />
        </div>
      </div>
      {showModal ? (
        <div>
          <div className="RR_modal-container" onClick={toggleModal}></div>
          <AddReviewForm
            id={props.id}
            meta={state.meta}
            toggleModal={toggleModal}
          />
        </div>
      ) : null}
    </section>
  );
};

export default RatingsAndReviewsMain;

/* KNOWN BUGS / TODO

  need to pull the entire reviews list for a product, that way i can filter based on review ratings.
  ~~~revision, i think i can just apply an additional filter to the existing list and also apply that filter
  to incomming reviews as well {1: false, 2: false, 3: true....etc} thisll keep it additive

  characteristics form isnt using required quite as well as the other forms components.

  break down review item subcomponent into more componenents

  //getReviewsByCount, getReviewMetaData
*/
