import React from "react";
import Sort from "./SubComponents/Sort.jsx";
import RatingsBreakDown from "./SubComponents/RatingsBreakDown.jsx";
import ReviewsList from "./SubComponents/ReviewsList.jsx";

import ATELIER_API from "./utilities/utilities.js";

class RatingsAndReviewsMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="section_rr">
        <h2>Ratings and Reviews</h2>
        <Sort id={this.props.id} />
        <div id="RR_Bd-List-container">
          <RatingsBreakDown id={this.props.id} />
          <ReviewsList id={this.props.id} />
        </div>
      </section>
    );
  }
}

export default RatingsAndReviewsMain;

/*      NOTES

  will need to know what product is currently seleted (props?)

  sub-components of ratings and reviews component

  SEARCH

  LIST
    > LIST ITEM

  RATINGS BD
    >STAR VALUE
    >PRODUCT BD
      ??> PRODUCT BD CATEGORIES

*/
