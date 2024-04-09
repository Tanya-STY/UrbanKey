// import React, { useState } from "react";
// import "./ImageGallery.css";
// import bathroom from "../Images/bathroom-ex.jpg";
// import bedroom from "../Images/bedroom-ex.jpg";
// import kitchen from "../Images/kitchen-ex.jpg";
// import living from "../Images/living-room-ex.jpg";
// import outside from "../Images/outside-condo-ex.jpg";

// const ImageGallery = ({images}) => {
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [bigImage, setBigImage] = useState(bedroom);
//   const [smallImages, setSmallImages] = useState([
//     bathroom,
//     bedroom,
//     kitchen,
//     living,
//     outside,
//     // Add more images as needed
//   ]);
//   const [startIndex, setStartIndex] = useState(0);

//   const handleClick = (image) => {
//     setBigImage(image);
//   };

//   const handlePrev = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 1);
//     }
//   };

//   const handleNext = () => {
//     if (startIndex + 4 < smallImages.length) {
//       setStartIndex(startIndex + 1);
//     }
//   };

//   const toggleZoom = () => {
//     setIsZoomed(!isZoomed);
//   };

//   return (
//       <div className="gallery">
//         <div
//           className={`gallery-big-image ${isZoomed ? "zoomed" : ""}`}
//           onClick={toggleZoom}
//         >
//           {bigImage && <img src={bigImage} alt="Main" />}
//         </div>
//         <div className="gallery-small-images">
//           {startIndex > 0 && (
//             <button className="gallery-left-arrow" onClick={handlePrev}>
//               &lt;
//             </button>
//           )}
//           {smallImages.slice(startIndex, startIndex + 4).map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Small ${index + startIndex + 1}`}
//               onClick={() => handleClick(image)}
//             />
//           ))}
//           {startIndex + 4 < smallImages.length && (
//             <button className="gallery-right-arrow" onClick={handleNext}>
//               &gt;
//             </button>
//           )}
//         </div>
//       </div>
//   );
// };

// export default ImageGallery;






import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [bigImage, setBigImage] = useState(null);

  // Function to handle click event on small images
  const handleClick = (image) => {
    setBigImage(image);
  };

  return (
    <div className="gallery">
      {/* Display the big image */}
      <div className="gallery-big-image">
        {bigImage && <img src={bigImage} alt="Main" />}
      </div>
      {/* Display the small images */}
      <div className="gallery-small-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Small ${index + 1}`}
            onClick={() => handleClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;



// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const ImageGallery = ({ images }) => {
//   const [imageUrls, setImageUrls] = useState([]);

//   // Set the first image as the big image when the component mounts
//   useEffect(() => {
//     if (images.length > 0) {
//       setBigImage(images[0]);
//     }
//   }, [images]);

//   const handleClick = (image) => {
//     setBigImage(image);
//   };

//   return (
//     <div className="gallery">
//       <div className="gallery-big-image">
//         {bigImage && <img src={bigImage} alt="Main" />}
//       </div>
//       <div className="gallery-small-images">
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Small ${index + 1}`}
//             onClick={() => handleClick(image)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useAuth from '../../CustomeHooks/useAuth';
// import { imagefrombuffer } from 'imagefrombuffer';

// const ImageGallery = () => {
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [bigImage, setBigImage] = useState(null);
//   const [images, setImages] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
  
//   const { auth } = useAuth();

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const token = auth?.token;
//         const response = await axios.get("http://localhost:5000/api/images", 
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         withCredentials: true
//       });
//         const imageUrls = response.data;
//         setImages(imageUrls);
//         if (imageUrls.length > 0) {
//           setBigImage(imageUrls[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const handleClick = (image) => {
//     setBigImage(image);
//   };

//   const handlePrev = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 1);
//     }
//   };

//   const handleNext = () => {
//     if (startIndex + 4 < images.length) {
//       setStartIndex(startIndex + 1);
//     }
//   };

//   const toggleZoom = () => {
//     setIsZoomed(!isZoomed);
//   };

//   return (
//     <div className="gallery">
//       <div
//         className={`gallery-big-image ${isZoomed ? "zoomed" : ""}`}
//         onClick={toggleZoom}
//       >
//         {bigImage && <img src={`data:image/jpeg;base64,${bigImage.base64_data}`} alt={bigImage.filename} />}
//       </div>
//       <div className="gallery-small-images">
//         {startIndex > 0 && (
//           <button className="gallery-left-arrow" onClick={handlePrev}>
//             &lt;
//           </button>
//         )}
//         {images.slice(startIndex, startIndex + 4).map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Small ${index + startIndex + 1}`}
//             onClick={() => handleClick(image)}
//           />
//         ))}
//         {startIndex + 4 < images.length && (
//           <button className="gallery-right-arrow" onClick={handleNext}>
//             &gt;
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;
