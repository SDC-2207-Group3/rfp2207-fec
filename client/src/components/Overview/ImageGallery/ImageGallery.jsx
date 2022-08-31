import React, { useState, useContext, createContext } from 'react';
import { ProductContext } from './../Overview.jsx';
import ThumbnailList from './ThumbnailList.jsx';

export const ImageGalleryContext = createContext(null);

const ImageGallery = (props) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [defaultView, setDefaultView] = useState(true);
  const productName = props.productStyle.name;

  const { state } = useContext(ProductContext);

  let photos = props.productStyle.photos ? props.productStyle.photos : [];
  const displayImageView = defaultView ? "overview-defaultView" : "overview-expandedView";

  const displayURL = props.productStyle.photos ? props.productStyle.photos[photoIndex].url : null;

  function leftPhoto () {
    setPhotoIndex(photoIndex - 1)
  }

  function rightPhoto () {
    setPhotoIndex(photoIndex + 1)
  }

  return (
    <ImageGalleryContext.Provider value={{photoIndex, setPhotoIndex, productName, defaultView}}>
      <div className={"overview-imageGallery "}>
      <div className={displayImageView}>
        <ThumbnailList
          photos={photos}
        />
        <div className="toggleExpandedView">

          <div className="image-arrows">
            {photoIndex === 0 ? null : <i className="fa-solid fa-angle-left" onClick={leftPhoto}/>}
          </div>

          <div className="displayImage-container" onClick={() => setDefaultView(!defaultView)}>
            <img className="overview-displayImage" src={displayURL}/>
          </div>

          <div className="image-arrows">
            {photoIndex === photos.length - 1 ? null : <i className="fa-solid fa-angle-right" onClick={rightPhoto}/>}
          </div>
        </div>
      </div>
      </div>
    </ImageGalleryContext.Provider>
  )
}

export default ImageGallery