import React from "react";
import Overview from "./Overview/Overview.jsx";
import RelatedItems from "./RelatedItems/RelatedItems.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> hello world </h1>
        <Overview />
        <RelatedItems />
        <div>
          <RatingsAndReviews />
        </div>
      </div>
    );
  }
}

export default App;
