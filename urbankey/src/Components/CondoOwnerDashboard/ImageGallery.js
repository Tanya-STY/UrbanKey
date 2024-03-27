import React, { useState } from "react";
import "./ImageGallery.css";
import bathroom from "../Images/bathroom-ex.jpg";
import bedroom from "../Images/bedroom-ex.jpg";
import kitchen from "../Images/kitchen-ex.jpg";
import living from "../Images/living-room-ex.jpg";
import outside from "../Images/outside-condo-ex.jpg";

const ImageGallery = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [bigImage, setBigImage] = useState(bedroom);
  const [smallImages, setSmallImages] = useState([
    bathroom,
    bedroom,
    kitchen,
    living,
    outside,
    // Add more images as needed
  ]);
  const [startIndex, setStartIndex] = useState(0);

  const handleClick = (image) => {
    setBigImage(image);
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 4 < smallImages.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
      <div className="gallery">
        <div
          className={`gallery-big-image ${isZoomed ? "zoomed" : ""}`}
          onClick={toggleZoom}
        >
          {bigImage && <img src={bigImage} alt="Main" />}
        </div>
        <div className="gallery-small-images">
          {startIndex > 0 && (
            <button className="gallery-left-arrow" onClick={handlePrev}>
              &lt;
            </button>
          )}
          {smallImages.slice(startIndex, startIndex + 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Small ${index + startIndex + 1}`}
              onClick={() => handleClick(image)}
            />
          ))}
          {startIndex + 4 < smallImages.length && (
            <button className="gallery-right-arrow" onClick={handleNext}>
              &gt;
            </button>
          )}
        </div>
      </div>
  );
};

export default ImageGallery;