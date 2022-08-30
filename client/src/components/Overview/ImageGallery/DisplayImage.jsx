import React, { useState, useContext } from 'react';
import { ImageGalleryContext } from './ImageGallery.jsx';

const DisplayImage = () => {

  const [defaultView, setDefaultView] = useState(true);

  const {displayURL} = useContext(ImageGalleryContext)

  const displayImageView = defaultView ? "overview-defaultView" : "overview-expandedView"



  return (
    <div className="overview-displayImage" onClick={() => setDefaultView(!defaultView)}>
      <img className="overview-displayImage" src={displayURL}/>
    </div>
  );
}

export default DisplayImage;