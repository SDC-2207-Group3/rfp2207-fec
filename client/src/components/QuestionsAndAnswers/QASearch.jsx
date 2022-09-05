import React from 'react';
import {useState, useEffect} from "react";
import http from "./httpReqsForQA.js";


const handleQASearch = (e, display, setDisplay, id) => {
  const searchTerm = e.target.value;
  let filtered;
  if (searchTerm.length >= 3) {
    filtered = display.filter(q => q.question_body.toLowerCase().includes(searchTerm))
    setDisplay(filtered);
  }
  else {
    // reset list to og display
    http.getQuestions(id)
      .then((res) => {setDisplay(res.data.results)})
      .catch((err) => {console.error(err)})
  }
}


function Search({mainQA, setQA, id}) {
  return (

    <input className="qa-search"
      type="text"
      placeholder="Have a question? Search for answers..."
      onChange={(event) => {handleQASearch(event, mainQA, setQA, id)}}
    />

  )
}




export default Search;