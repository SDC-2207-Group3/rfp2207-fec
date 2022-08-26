import React from "react";
import axios from "axios";
import ATELIER_API from "./utilities/utilities.js";
import Sort from "./SubComponents/Sort.jsx";
import RatingsBreakDown from "./SubComponents/RatingsBreakDown.jsx";
import ReviewsList from "./SubComponents/ReviewsList.jsx";

class RatingsAndReviewsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || "65631",
      selectedItem: {},
      sortBy: "newest",
      displayedReviews: 2,
      reviews: [],
      meta: {},
      reviewStats: {},
    };

    this.getAvgReviewValue = this.getAvgReviewValue.bind(this);
  }

  ////////////////////////////////////////////////////////////

  getAvgReviewValue(meta) {
    // if (Object.keys(this.props.meta).length) {
    let statsObj = {};
    statsObj.starTotal = 0;
    statsObj.voteTotal = 0;
    for (let [star, count] of Object.entries(meta.ratings)) {
      statsObj.starTotal += star * count;
      statsObj.voteTotal += Number(count);
    }
    console.log("statsobj made", statsObj);
    return statsObj;
  }

  componentDidMount() {
    //params = page, count, sort, product_id
    //get reviews for current product
    axios
      .get(`${ATELIER_API}/reviews`, {
        params: {
          product_id: `${this.state.id}`,
          sort: `${this.state.sortBy}`,
          count: `${this.state.displayedReviews}`,
        },
        headers: { Authorization: process.env.KEY },
      })
      //res.data.results = arr of reviews
      .then((res) => {
        //update state
        console.log("review response", res);
        let stateCopy = this.state;
        stateCopy.reviews = res.data.results;
        this.setState(stateCopy);
      })
      .then(() => {
        // get meta data for current product
        return axios.get(`${ATELIER_API}/reviews/meta`, {
          params: { product_id: `${this.state.id}` },
          headers: { Authorization: process.env.KEY },
        });
      })
      .then((res) => {
        console.log("meta response", res);
        let stateCopy = this.state;

        //create meta info to pass to sub component
        let reviewStatsObj = this.getAvgReviewValue(res.data);
        stateCopy.meta = res.data;
        stateCopy.reviewStats = reviewStatsObj;

        //update state once more
        this.setState(stateCopy);
      })
      .catch((err) => console.log("failed to fetch", err));
  }

  ////////////////////////////////////////////////////////////

  render() {
    return (
      <section id="section_rr">
        <h2>Ratings and Reviews</h2>
        <div id="RR_bd-sort-list-container">
          <RatingsBreakDown
            reviewStats={this.state.reviewStats}
            meta={this.state.meta}
            id={this.props.id}
          />
          <div id="RR_sort-list-container">
            <Sort sortMethod={this.state.sortBy} id={this.props.id} />
            <ReviewsList reviews={this.state.reviews} id={this.props.id} />
          </div>
        </div>
      </section>
    );
  }
}

export default RatingsAndReviewsMain;
