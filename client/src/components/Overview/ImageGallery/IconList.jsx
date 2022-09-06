import React, { useContext } from 'react';
import { ImageGalleryContext } from './ImageGallery.jsx'

const IconList = (props) => {

  const { photoIndex, setPhotoIndex } = useContext(ImageGalleryContext)

  return (
    <div className="overview-imageGallery-expanded-icons">
      {props.photos.length > 0 ? props.photos.map((photo, index) =>
        <input checked={photoIndex === index} type="radio" key={index} onClick={() => setPhotoIndex(index)}/>
      ) : null}
    </div>
  );
}

export default IconList;