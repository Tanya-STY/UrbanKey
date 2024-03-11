import React, { useState } from 'react';
import picture1Icon from '../Images/picture_1.svg';
import camera_1 from '../Images/picture_1.svg';
import './PropertyProfileManagement.css';
import companyLogo from '../Images/Component 81.svg'; 
import lightBulbIcon from '../Images/light-bulb 1.svg'; 
import AdvertiseFeatures from './AdvertiseFeatures.js';

const PropertyProfileManagement = () => {
  const [photos, setPhotos] = useState([]);

  const handleFileUpload = (event) => {
    console.log(event.target.files);
  };

  const handlePhotoSelect = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPhotos((prevPhotos) => prevPhotos.concat(filesArray));
    }
  };

  React.useEffect(() => {
    return () => photos.forEach((photo) => URL.revokeObjectURL(photo));
  }, [photos]);


  return (


    <div className="property-management-container">
      
      <div className="main-content">
      
      <h1 className="title">Property Profile Management</h1>
      <h2 className="section-title">Category</h2>
      <div className="category-section">
        <div className="dropdown">
          <label htmlFor="housing" className="label-required">Housing</label>
          <select id="housing" className="select-field">
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="unit-id" className="label-required">Unit Id</label>
          <select id="unit-id" className="select-field">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="property-details-section">
          <h2 className="section-title">Property Details</h2>
          <div className="input-container full-width">
            <label htmlFor="title" className="label-required">Title</label>
            <input id="title" type="text" className="input-field" placeholder="Title *" required />
          </div>
          <div className="input-container full-width">
            <label htmlFor="description" className="label-required">Description</label>
            <textarea id="description" className="input-field" placeholder="Description *" required />
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="unit-owner" className="label-required">Unit Owner</label>
              <input id="unit-owner" type="text" className="input-field" placeholder="Unit Owner" required />
            </div>
            <div className="input-container">
              <label htmlFor="unit-occupant" className="label-required">Unit occupant information</label>
              <input id="unit-occupant" type="text" className="input-field" placeholder="Unit Occupant Information" required />
            </div>
          </div>
          <div className="input-container full-width">
            <label htmlFor="price" className="label-required">Price</label>
            <input id="price" type="text" className="input-field" placeholder="Price *" required />
          </div>
          <div className="input-container full-width">
            <label htmlFor="number-of-room" className="label-required">Number of Room</label>
            <input id="number-of-room" type="text" className="input-field" placeholder="Number of Room *" required />
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="gross-m2" className="label-required">Gross M²</label>
              <input id="gross-m2" type="text" className="input-field" placeholder="Gross M² *" required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="net-m2" className="label-required">Net M²</label>
              <input id="net-m2" type="text" className="input-field" placeholder="Net M² *" required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="warming-type" className="label-required">Warming Type</label>
              <select id="warming-type" className="select-field" required>
              </select>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="building-age" className="label-required">Building Age</label>
              <select id="building-age" className="select-field" required>
              </select>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="floor-location" className="label-required">Floor Location</label>
              <select id="floor-location" className="select-field" required>
              </select>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="available-for-loan" className="label-required">Available for Loan</label>
              <select id="available-for-loan" className="select-field" required>
              </select>
            </div>
          </div>
          <div className="input-container full-width">
            <label htmlFor="furnished" className="label-required">Furnished</label>
            <select id="furnished" className="select-field">
            </select>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="parking" className="label-required">Parking</label>
              <select id="parking" className="select-field" required>
              </select>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="parking-spot-id">Parking Spot ID</label>
              <input id="parking-spot-id" type="text" className="input-field" placeholder="Parking Spot ID" />
            </div>
          </div>
          <div className="input-container full-width">
            <label htmlFor="locker">Locker</label>
            <select id="locker" className="select-field">
            </select>
          </div>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="rental-income">Rental Income</label>
              <input id="rental-income" type="text" className="input-field" placeholder="Rental Income" />
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="type">Type</label>
                <select id="type" className="select-field">
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="location-information-section">
          <h2 className="section-title">Location Information</h2>
          <div className="input-row">
            <div className="input-container">
              <label htmlFor="province" className="label-required">Province</label>
              <select id="province" className="select-field" required>
                <option value="">Select Province *</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="city" className="label-required">City</label>
              <select id="city" className="select-field" required>
                <option value="">Select City *</option>
              </select>
            </div>
          </div>
          <div className="input-container full-width">
            <label htmlFor="neighborhood" className="label-required">Neighborhood</label>
            <select id="neighborhood" className="select-field" required>
              <option value="">Select Neighborhood *</option>
            </select>
          </div>
        </div>

        




      

        </div>
      </div>

      <div class="styled-container">

      <div className="map-container" style={{ width: '100%', height: '400px', marginBottom: '30px' }}>
        <iframe
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%&amp;height=400&amp;hl=en&amp;q=Montreal,%20Canada+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Google Maps"
        ></iframe>
      </div>
      </div>

      <div class="styled-container">



      <div className="file-upload-container">
        <h2 className="section-title">Upload Condo Files</h2>
        <p className="file-upload-instructions">
          You can upload your condo files which include condo declarations, annual budgets, etc.
        </p>
        <input
          type="file"
          className="file-input"
          onChange={handleFileUpload}
        />
        <button>Upload File</button>
      </div>

      </div>


      

      <div className="posting-photos-section">
        <h2 className="section-title">Posting Photos</h2>
        <img src={picture1Icon} alt="Camera icon" />
        <p>You can add upto 30 photos</p>
        <div className="photo-upload-btn">
          <img src={camera_1} alt="Camera icon" />
          Browse From Computer
        </div>
        <div className="photo-placeholder">
          <span className="plus-icon">+</span>
          <p>You can add 30 photos to your ad</p>
        </div>
      </div>
      <div className="property-management-container">
        <AdvertiseFeatures />
      </div>
    </div>
  );
};

export default PropertyProfileManagement;