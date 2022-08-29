import React, { useState, useEffect, useContext } from 'react';
import { ImageGalleryContext } from './ImageGallery.jsx';
import { ProductContext } from './../Overview.jsx';

const ThumbnailList = (props) => {
  const { setPhotoIndex } = useContext(ImageGalleryContext);
   const { productName } = useContext(ImageGalleryContext);
  const { state } = useContext(ProductContext)

  const displayLimit = 7
  const [displayIndex, setDisplayIndex] = useState(0);
  const displayList = props.photos.slice(displayIndex, displayIndex + displayLimit)

  function GetThumbnailIndex (photo) {
    return props.photos.indexOf(photo);
  }

  function scrollUp () {
    setDisplayIndex(displayIndex - 1);
  }

  function scrollDown () {
    setDisplayIndex(displayIndex + 1);
  }

  return (
    <div className="overview-thumbnailList">
      {console.log(state, 'STATE')}
      <div className="overview-container">
        <div className="overview-scroll">
          {displayIndex === 0 ? null : <i className="fa-solid fa-angle-up" onClick={scrollUp} ></i>}
        </div>
        <div className="overview-thumbnail-gallery">
          {displayList.map((photo, index) => (
              <div key={index} className="overview-thumbnail-container" onClick={() => setPhotoIndex(GetThumbnailIndex(photo))}>
                <img

                  className="overview-thumbnail"
                  src={photo.thumbnail_url}
                  alt={`${props.name} thumbnail ${index}`}
                />
              </div>
            ))}
        </div>
        <div className="overview-scroll">
          {displayIndex + displayLimit >= props.photos.length ? null : <i className="fa-solid fa-angle-down" onClick={scrollDown} ></i>}
        </div>
      </div>
    </div>
  );
}

export default ThumbnailList;