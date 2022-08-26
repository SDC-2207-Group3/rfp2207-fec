import React, { useState, useEffect } from 'react'

const ThumbnailList = (props) => {
  const displayLimit = 7
  const [displayIndex, setDisplayIndex] = useState(0);
  const displayList = props.photos.slice(displayIndex, displayIndex + displayLimit)


  function scrollUp () {
    setDisplayIndex(displayIndex - 1);
  }

  function scrollDown () {
    setDisplayIndex(displayIndex + 1);
  }

  return (
    <div className="overview-thumbnailList">
      <div className="overview-container">
        <div className="overview-scroll-up">
          {displayIndex === 0 ? null : <i className="fa-solid fa-angle-up" onClick={scrollUp} ></i>}
        </div>
        <div className="overview-thumbnail-gallery">
          {displayList.map((photo, index) => (
              <div key={index} className="overview-thumbnail-container">
                <img

                  className="overview-thumbnail"
                  src={photo.thumbnail_url}
                  alt={`${props.name} thumbnail ${index}`}
                />
              </div>
            ))}
        </div>
        <div className="overview-scroll-down">
          {displayIndex + displayLimit >= props.photos.length ? null : <i className="fa-solid fa-angle-down" onClick={scrollDown} ></i>}
        </div>
      </div>
    </div>
  );
}

export default ThumbnailList;