import React, { useState, useContext, createContext } from 'react';
import { ProductContext } from './../Overview.jsx';
import ThumbnailList from './ThumbnailList.jsx';
import DisplayImage from './DisplayImage.jsx'

export const ImageGalleryContext = createContext(null);

const ImageGallery = (props) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [defaultView, setDefaultView] = useState(true);
  const productName = props.productStyle.name;

  const { state } = useContext(ProductContext);

  let photos = props.productStyle.photos ? props.productStyle.photos : []
  const displayImageView = defaultView ? "overview-defaultView" : "overview-expandedView"

  const imageGalleryStyle = {
    backgroundColor: 'lightBlue',
  }

  const displayURL = props.productStyle.photos ? props.productStyle.photos[photoIndex].url : null

  return (
    <ImageGalleryContext.Provider value={{photoIndex, setPhotoIndex, productName}}>
      <div className={"overview-imageGallery "}>
      <div className={displayImageView}>

        <ThumbnailList
          photos={photos}
        />

        <div className="overview-displayImage" onClick={() => setDefaultView(!defaultView)}>
          <img className="overview-displayImage" src={displayURL}/>
        </div>
      </div>
      </div>
    </ImageGalleryContext.Provider>
  )
}

export default ImageGallery