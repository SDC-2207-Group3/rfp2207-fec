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
    };
  }

  ////////////////////////////////////////////////////////////

  componentDidMount() {
    //params = page, count, sort, product_id
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
        console.log("review response", res);
        let stateCopy = this.state;
        stateCopy.reviews = res.data.results;
        this.setState(stateCopy);
      })
      .then(() => {
        return axios.get(`${ATELIER_API}/reviews/meta`, {
          params: { product_id: `${this.state.id}` },
          headers: { Authorization: process.env.KEY },
        });
      })
      .then((res) => {
        console.log("meta response", res);
        let stateCopy = this.state;
        stateCopy.meta = res.data;
        this.setState(stateCopy);
      })
      .catch((err) => console.log("failed to fetch", err));
  }

  ////////////////////////////////////////////////////////////

  render() {
    return (
      <section id="section_rr">
        <h2>Ratings and Reviews</h2>
        <Sort id={this.props.id} />
        <div id="RR_Bd-List-container">
          <RatingsBreakDown meta={this.state.meta} id={this.props.id} />
          <ReviewsList reviews={this.state.reviews} id={this.props.id} />
        </div>
      </section>
    );
  }
}

export default RatingsAndReviewsMain;
