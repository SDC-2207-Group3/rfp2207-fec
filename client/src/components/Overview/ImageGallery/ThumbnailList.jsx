import React, { useState, useEffect, useContext } from 'react';
import { ImageGalleryContext } from './ImageGallery.jsx';
import { ProductContext } from './../Overview.jsx';

const ThumbnailList = (props) => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const { state } = useContext(ProductContext);
  const { setPhotoIndex, productName, photoIndex, defaultView } = useContext(ImageGalleryContext);

  const displayLimit = 7

  function GetThumbnailIndex (photo) {
    return props.photos.indexOf(photo);
  }

  function scrollUp () {
    setDisplayIndex(displayIndex - 1);
  }

  function scrollDown () {
    setDisplayIndex(displayIndex + 1);
  }

  function scrollFn () {
    return - displayIndex * (99.9/displayLimit) + '%'
  }

  const thumbnailScroll = {
    top: scrollFn(),
  }

  const selectedThumbnail = {
    border: "1px solid rgb(0, 145, 255)",
    borderRadius: "50%",
    transition: '0.25s'
  }

   useEffect(() => {
    // console.log(photoIndex, 'photoIndex')
    // console.log(displayIndex, 'displayIndex')
    // console.log(photoIndex - displayLimit)
    photoIndex - displayLimit >= displayIndex ? setDisplayIndex(photoIndex - displayLimit + 1) : null;
   })

  return (
    <div className="overview-thumbnailList" style={defaultView ? { opacity: '100', transition: '1s ease 0.5s' } : { opacity: '0', transition: '0.25s' }}>
      <div className={"overview-scroll"}>
        {displayIndex === 0 ?
        null :
        <div className="overview-scroll-button">
          <i className="fa-solid fa-angle-up thumbnail-scroll" onClick={scrollUp} />
        </div>
        }
      </div>

      <div className="thumbnail-viewport">
        <div className="thumbnail-list" style={thumbnailScroll}>
          {
            props.photos.map((photo, index) =>
              <div key={index} className="photo-section" onClick={() => setPhotoIndex(GetThumbnailIndex(photo))}>
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

      <div className={"overview-scroll"}>
        {props.photos.length - displayLimit <= displayIndex?
        null :
        <div className="overview-scroll-button">
          <i className="fa-solid fa-angle-down thumbnail-scroll" onClick={scrollDown} />
        </div>
        }
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