import React from 'react';
import {useState} from "react";

const handleQASearch = (e, display, setDisplay) => {
  const searchTerm = e.target.value;
  let filtered;
  if (searchTerm.length >= 3) {
    console.log('this is display: ', display)
    filtered = display.filter(q => q.question_body.toLowerCase().includes(searchTerm))
    setDisplay(filtered);
    // TODO: reset back to all results if delete everything
    
  }
}


function Search({mainQA, setQA}) {
  return (
    <input
    className="qa-search"
    type="text"
    placeholder="Have a question? Search for answers..."
    onChange={(event) => {handleQASearch(event, mainQA, setQA)}}
    />


  )
}




export default Search;