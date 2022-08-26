import React, { useState, useReducer } from 'react';
import ThumbnailList from './ThumbnailList.jsx';

let ImageGallery = (props) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  console.log(props.productStyle, 'a')
  let photos = props.productStyle.photos ? props.productStyle.photos : []

  const imageGalleryStyle = {
    backgroundColor: 'lightBlue',
  }

  const displayURL = props.productStyle.photos ? props.productStyle.photos[photoIndex].url : null

  return (
    <div className="overview-imageGallery" style={imageGalleryStyle}>
      <ThumbnailList
        name = {props.productStyle.name}
        photos={photos}
      />
      <div className="overview-displayImage">
        <img className="overview-displayImage" src={displayURL}/>

      </div>
    </div>
  )
}

export default ImageGallery