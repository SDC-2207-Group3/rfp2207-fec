import React, { useState, useEffect, createContext, useReducer } from "react";
import Overview from "./Overview/Overview.jsx";
import RelatedItemsAndOutfits from "./RelatedItems/MainRIO.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx";

import axios from "axios";

const Atelier = require("./Utilities/Atelier.jsx");

export const ProductContext = createContext();

const reducer = (state, newState) => ({ ...state, ...newState });

const initialeState = {
  id: 65638,
  product_info: [],
  product_rating: {},
  product_style: [],
};

const App = (props) => {
  const [state, setState] = useReducer(reducer, initialeState);

  useEffect(() => {
    axios
      .all([
        Atelier.getProductInfo(state.id),
        Atelier.getProductStyle(state.id),
        Atelier.getReviewMetaData(state.id),
      ])
      .then((responses) => {
        setState({
          product_info: responses[0].data,
          product_style: responses[1].data,
          product_rating: responses[2].data,
        });
      });
  }, [state.id]);

  const changeId = (newId) => {
    setState({ id: newId });
  };

  console.log("main app.jsx id", state.id);

  return (
    <div id="app">
      <ProductContext.Provider value={{ ...state, changeId }}>
        <Overview id={state.id} />
        <RelatedItemsAndOutfits id={state.id} />
        <QuestionsAndAnswers id={state.id} />
        <RatingsAndReviews id={state.id} />
      </ProductContext.Provider>
    </div>
  );
};

export default App;
