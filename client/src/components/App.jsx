import React, { useState, useEffect, createContext, useReducer } from 'react';
import Overview from "./Overview/Overview.jsx";
import RelatedItemsAndOutfits from "./RelatedItems/MainRIO.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx";
import ToggleSwitch from "./ToggleSwitch.jsx";

import axios from 'axios';

const Atelier = require('./Utilities/Atelier.jsx');

export const ProductContext = createContext();

const reducer = (state, newState) => ({...state, ...newState})

const initialeState = {
  id: 65638,
  product_info: [],
  product_rating: {},
  product_style: []
}

const App = (props) => {
  const [state, setState] = useReducer(reducer, initialeState);

  useEffect(() => {
    axios.all([
      Atelier.getProductInfo(state.id),
      Atelier.getProductStyle(state.id),
      Atelier.getReviewMetaData(state.id)
    ])
    .then((responses) => {
      setState({
        product_info: responses[0].data,
        product_style: responses[1].data,
        product_rating: responses[2].data
      })
    })
  }, [state.id])

  const changeId = (newId) => {
    setState({id: newId});
  }

  console.log('main app.jsx id', state.id);

  // hook for toggling dark mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    if (!darkMode) {
      // if dark mode is not on, change to darkMode
      setDarkMode(true)
    }
    else {
      // turn dark mode off
      setDarkMode(false)
    }
  }

  return (
    <div id="app" className={`${darkMode ? "darkMode" : ""}`}>
      <ProductContext.Provider value={{...state, changeId}}>
      <React.Fragment>
        <ToggleSwitch
          label="Dark Mode"
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </React.Fragment>
        <Overview id={state.id} />
        <RelatedItemsAndOutfits id={state.id} />
        <QuestionsAndAnswers id={state.id} />
        <RatingsAndReviews id={state.id} />
      </ProductContext.Provider>
    </div>
  );
};

export default App;
