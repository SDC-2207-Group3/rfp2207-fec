import React, { useState, useContext, createContext, useRef, useEffect, useReducer } from 'react';
import { ProductContext } from './../Overview.jsx';
import ThumbnailList from './ThumbnailList.jsx';
import IconList from './IconList.jsx';

export const ImageGalleryContext = createContext(null);

const reducer = (state, action) => {
  switch(action.type) {
    case 'minimize':
      return {...state,
        defaultView: true,
        toggleZoom: false,
        setZoomAmount: 250
      }
    case 'reset':
      return {...state,
        photoIndex: 0,
        displayIndex: 0
      }
    case 'leftPhoto':
      return { ...state, photoIndex: state.photoIndex - 1 }
    case 'rightPhoto':
      return { ...state, photoIndex: state.photoIndex + 1 }
    case 'scrollUp':
      return { ...state, displayIndex: state.displayIndex - 1 }
    case 'scrollDown':
      return { ...state, displayIndex: state.displayIndex + 1 }
    default:
      return { state }
  }
}

const initialState = {
  offset:       { top: 0, left: 0 },
  photoIndex:   0,
  toggleZoom:   false,
  zoomAmount:   250,
  defaultView:  true,
  displayIndex: 0
}

const ImageGallery = (props) => {

  const displayLimit = 7;

  const [offset, setOffset]             = useState({ top: 0, left: 0 });
  const [photoIndex, setPhotoIndex]     = useState(0);
  const [toggleZoom, setToggleZoom]     = useState(false);
  const [zoomAmount, setZoomAmount]     = useState(250);
  const [defaultView, setDefaultView]   = useState(true);
  const [displayIndex, setDisplayIndex] = useState(0);

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

  useEffect(() => { // Automatically scrolls thumbnail bar on L/R change
    photoIndex - displayLimit >= displayIndex ?
      setDisplayIndex(photoIndex - displayLimit + 1) : null;
    photoIndex - displayIndex === -1 ?
      setDisplayIndex(photoIndex) : null;
   }, [photoIndex])

  useEffect(() => { //Automatically changes display image on scroll change
    photoIndex - displayIndex === -1 ?
      setPhotoIndex (displayIndex) : null;
    photoIndex - displayIndex === displayLimit ?
      setPhotoIndex(photoIndex - 1) : null;
   }, [displayIndex])

  useEffect(() => {
    setPhotoIndex(0);
    setDisplayIndex(0);
   }, [state.productDetails])

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
      const zoomRef      = zoomImageRef.current.getBoundingClientRect();
      const imageRef     = targetImageRef.current.getBoundingClientRect();
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
    setZoomAmount(e.target.value)
  }

  return (
    <ImageGalleryContext.Provider value={{
      photoIndex,
      productName,
      defaultView,
      displayIndex,
      setPhotoIndex,
      setDisplayIndex
    }}>
      <div className="overview-imageGallery ">
        {defaultView ?
          <ThumbnailList
            photos={photos}
          />
        : null}
        <div className={displayImageView}>
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
          {defaultView ?  null :
          toggleZoom ? null :
            <input
              type="range"
              min="100" max="400"
              value={zoomAmount}
              className="overview-zoom-slider"
              onChange={handleSlider}/>}
          {defaultView ? null :
          <button onClick={minimize} className="overview-minimize">-</button>}
          {defaultView ? null : <IconList photos={photos}/>}
        </div>
      </div>
    </ImageGalleryContext.Provider>
  )
}

export default ImageGallery