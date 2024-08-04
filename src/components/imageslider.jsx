import PropTypes from 'prop-types';
import { useState } from 'react';
import "../styles/imageslider.css"

export default function ImageSlider({images}) {
 
  const [cur, setCur] = useState(0);
  let tmp = 0;

  function handlePrev() {
    setCur(cur ? cur - 1: images.length -1);
  }

  function handleNext() {
    setCur(cur == images.length - 1 ? 0 : cur + 1);
  }

  return (
    <div className="imageslider">
      <div className="left" onClick={handlePrev}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ececec">
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
        </svg>
      </div>
      <div className="right" onClick={handleNext}>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="auto" fill="#ececec">
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
        </svg>
      </div>
      <div className="progress">
        <div>
          {
            images.map((_, i) => {
              return <div key={tmp++} style={cur == i ? { padding: '3px', backgroundColor: '#ae8213'} : {}}></div>
            })
          }
        </div>
      </div>
      <div className="mainslider" style={
        {
          transform: `translateX(-${cur * 100}%)`
        }
      }>
        {
          images.length ?
          <>
            {
              images.map((img) => {
                return <img src={img} key={tmp++} />
              })
            }
          </>
          :
          <p>no images</p>
        }
      </div>
    </div>
  );

}

ImageSlider.propTypes = {
  images: PropTypes.array,
}