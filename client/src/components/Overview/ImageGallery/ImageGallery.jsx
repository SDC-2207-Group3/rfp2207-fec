import React, { useState, useContext, createContext, useRef } from 'react';
import { ProductContext } from './../Overview.jsx';
import ThumbnailList from './ThumbnailList.jsx';

export const ImageGalleryContext = createContext(null);

const ImageGallery = (props) => {

  const [photoIndex, setPhotoIndex] = useState(0);
  const [toggleZoom, setToggleZoom] = useState(false);
  const [defaultView, setDefaultView] = useState(true);
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [zoomAmount, setZoomAmount] = useState(250);

  const zoomImageRef = useRef(null);
  const containerRef = useRef(null);
  const targetImageRef = useRef(null);

  const { state } = useContext(ProductContext);

  const photos           = props.productStyle.photos ? props.productStyle.photos : [];
  const displayURL       = props.productStyle.photos ? props.productStyle.photos[photoIndex].url : null;
  const productName      = props.productStyle.name;
  const displayImageView = defaultView               ? "overview-defaultView" : "overview-expandedView";


  function leftPhoto () {
    setPhotoIndex(photoIndex - 1)
  }

  function rightPhoto () {
    setPhotoIndex(photoIndex + 1)
  }

  function minimize () {
    setDefaultView(true);
    setToggleZoom(false);
    setZoomAmount(250);
  }

  function ExpandandZoom () {
    defaultView ? setDefaultView(false) : setToggleZoom(!toggleZoom) //zoom
  }

  function handleMouseMove (e) {
    if (zoomImageRef.current) {
      const zoomRef = zoomImageRef.current.getBoundingClientRect();
      const imageRef = targetImageRef.current.getBoundingClientRect();
      const containerRef = document.getElementsByClassName('displayImage-container')[0].getBoundingClientRect()
      const xRatio = (zoomRef.width - containerRef.width)/imageRef.width;
      const yRatio = (zoomRef.height - containerRef.height)/imageRef.height;

      const top = Math.max(
        Math.min(e.pageY - imageRef.top, imageRef.height), 0
      )

      const left = Math.max(
        Math.min(e.pageX - imageRef.left, imageRef.width), 0
      )

      setOffset({
        top: top * -yRatio,
        left: left * -xRatio,
      });
    }
  }

  function handleSlider(e) {
    console.log(e.target.value);
    setZoomAmount(e.target.value)
  }

  return (
    <ImageGalleryContext.Provider value={{photoIndex, setPhotoIndex, productName, defaultView}}>
      <div className={"overview-imageGallery "}>
      <div className={displayImageView}>
        {defaultView ? <ThumbnailList
          photos={photos}
        /> : null}
        <div className="toggleExpandedView">

          <div className="image-arrows">
            {photoIndex === 0 || toggleZoom? null : <i className="fa-solid fa-angle-left" onClick={leftPhoto}/>}
          </div>

          <div className="displayImage-container" onClick={ExpandandZoom} ref={containerRef}>

            <img className="overview-displayImage" src={displayURL} ref={targetImageRef} onMouseMove={handleMouseMove}/>
            {defaultView ? null :
            toggleZoom ?
                <img className="overview-zoom-image" src={displayURL} ref={zoomImageRef} style={{...offset, width: zoomAmount + '%'}} onMouseMove={handleMouseMove}/>
            : null}
          </div>

          <div className="image-arrows">
            {photoIndex === photos.length - 1 || toggleZoom ? null : <i className="fa-solid fa-angle-right" onClick={rightPhoto}/>}
          </div>
        </div>
        {defaultView ? null :
          toggleZoom ? null :
           <input
            type="range"
            min="100" max="400"
            value={zoomAmount}
            className="overview-zoom-slider"
            onChange={handleSlider}/>}
        {defaultView ? null :
        <button onClick={minimize} className="overview-minimize">-</button>}
      </div>
      </div>
    </ImageGalleryContext.Provider>
  )
}

export default ImageGallery