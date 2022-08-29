import React, { useState, useEffect, useContext } from 'react';
import { ImageGalleryContext } from './ImageGallery.jsx';
import { ProductContext } from './../Overview.jsx';

const ThumbnailList = (props) => {
  const { setPhotoIndex, productName, photoIndex } = useContext(ImageGalleryContext);
  const { state } = useContext(ProductContext);

  const displayLimit = 7
  const [displayIndex, setDisplayIndex] = useState(0);

  function GetThumbnailIndex (photo) {
    return props.photos.indexOf(photo);
  }

  function scrollUp () {
    setDisplayIndex(displayIndex + 1);
  }

  function scrollDown () {
    setDisplayIndex(displayIndex - 1);
  }

  function scrollFn () {
    return displayIndex * (100/displayLimit) + '%'
  }

  const thumbnailScroll = {
    position: 'absolute',
    top: scrollFn(),
    transition: '0.5s'
  }

  const selectedThumbnail = {
    border: "1px solid rgb(0, 145, 255)",
    borderRadius: "50%",
    transition: '0.25s'
  }

  return (
    <div className="overview-thumbnailList">
      <div className="overview-scroll">
        {displayIndex === 0 ? null : <i className="fa-solid fa-angle-up" onClick={scrollUp} ></i>}
      </div>

      <div className="thumbnail-viewport">
        <div classname="thumbnail-list" style={thumbnailScroll}>
          {
            props.photos.map((photo, index) =>
              <div className="photo-section" onClick={() => setPhotoIndex(GetThumbnailIndex(photo))}>
                <div className="thumbnail-container" style={index === photoIndex ? selectedThumbnail : null}>
                  <img
                    className="overview-thumbnail"
                    src={photo.thumbnail_url}
                    alt={`${props.name} thumbnail ${index}`}
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>

      <div className="overview-scroll">
        {displayIndex <= (displayLimit - props.photos.length) ? null : <i className="fa-solid fa-angle-down" onClick={scrollDown} ></i>}
      </div>
    </div>
  );
}

export default ThumbnailList;

// {console.log(state, 'STATE')}
// <div className="overview-container">
//   <div className="overview-scroll">
//     {displayIndex === 0 ? null : <i className="fa-solid fa-angle-up" onClick={scrollUp} ></i>}
//   </div>
//   <div className="overview-thumbnail-gallery">
//       <div className="overview-thumbnail-view">
//         {props.photos.map((photo, index) => (
//             <div key={index} className="overview-thumbnail-container" onClick={() => setPhotoIndex(GetThumbnailIndex(photo))}>
//               <img

//                 className="overview-thumbnail"
//                 src={photo.thumbnail_url}
//                 alt={`${props.name} thumbnail ${index}`}
//               />
//             </div>
//           ))}
//       </div>
//   </div>
//   <div className="overview-scroll">
//     {displayIndex + displayLimit >= props.photos.length ? null : <i className="fa-solid fa-angle-down" onClick={scrollDown} ></i>}
//   </div>
// </div>