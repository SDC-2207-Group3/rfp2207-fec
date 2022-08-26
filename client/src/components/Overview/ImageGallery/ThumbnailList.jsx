import React, { useState, useEffect } from 'react'

const ThumbnailList = (props) => {
  const displayLimit = 7
  const [displayIndex, setDisplayIndex] = useState(0);
  const displayList = props.photos.slice(displayIndex, displayIndex + displayLimit)

  const displayScroll = {
    height: "20px"
  }

  const thumbnail = {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    margin: "auto"
  }

  const TNContainer = {
    width: "5rem",
    height: "5rem",
    backgroundColor: "lightBlue",
    display: "flex",
    alignContent: "center",
    border: "1px solid black",
    margin: "5px"
  }

 const [toggleWidth, setToggleWidth] = useState(false);

  const state1 = {
    backgroundColor: "red",
    width: "40%",
    transition: "500ms"
  }

  const state2 = {
    backgroundColor: "red",
    width: "90%",
    transition: "500ms"
  }



  function scrollUp () {
    setDisplayIndex(displayIndex - 1);
  }

  function scrollDown () {
    setDisplayIndex(displayIndex + 1);
  }

  return (
    <div className="overview-thumbnailList">
        {displayIndex === 0 ? <div style={displayScroll}></div> : <div><button onClick={scrollUp} style={displayScroll}>up</button></div>}
        {displayList.map((photo, index) => (
            <div key={index} style={TNContainer}>
              <img
                style={thumbnail}
                className="thumbnail"
                src={photo.thumbnail_url}
                alt={`${props.name} thumbnail ${index}`}
              />
            </div>
          ))}
          {displayIndex + displayLimit >= props.photos.length ? <div style={displayScroll}></div> : <button onClick={scrollDown} style={displayScroll}>down</button>}
    </div>
  );
}

export default ThumbnailList;