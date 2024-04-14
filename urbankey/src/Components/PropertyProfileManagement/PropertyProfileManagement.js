import React, { useState, useEffect } from 'react';
import picture1Icon from '../Images/picture_1.svg';
import camera_1 from '../Images/picture_1.svg';
import './PropertyProfileManagement.css';
import companyLogo from '../Images/Component 81.svg';
import lightBulbIcon from '../Images/light-bulb 1.svg';
import AdvertiseFeatures from './AdvertiseFeatures.js';
import RegistrationKey from '../RegistrationKey/RegistrationKey';

import axios from 'axios';
import useAuth from '../../CustomeHooks/useAuth';

const PropertyProfileManagement = () => {
  const { auth } = useAuth();

  const [file, setFile] = useState(null);
  const [unitId, setUnitId] = useState();
  const [unitOwner, setUnitOwner] = useState('');
  const [unitOccupant, setUnitOccupant] = useState('');
  const [registrationKeyRenter, setRegistrationKeyRenter] = useState('');
  const [registrationKeyOwner, setRegistrationKeyOwner] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedInteriorFeatures, setSelectedInteriorFeatures] = useState([]);
  const [selectedExteriorFeatures, setSelectedExteriorFeatures] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    unitId: '',
    title: '',
    description: '',
    unitOwner: '',
    unitOccupant: '',
    price: '',
    numberOfRoom: '',
    grossM2: '',
    netM2: '',
    warmingType: '',
    buildingAge: '',
    floorLocation: '',
    availableForLoan: '',
    furnished: '',
    parking: '',
    parkingID: '',
    locker: '',
    rentalIncome: '',
    province: '',
    city: '',
    neighborhood: ''

  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      unitId: unitId,
      unitOwner: unitOwner,
      unitOccupant: unitOccupant
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const fetchUnitData = async () => {
    try {
      const token = auth?.token;
      const response = await axios.get(`http://localhost:5000/unitInfo/${unitId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      const userData = response.data;
      setUnitOwner(userData.owner);
      setUnitOccupant(userData.occupant);
      setRegistrationKeyRenter(userData.registration_key_renter);
      setRegistrationKeyOwner(userData.registration_key_owner);
      setFormData({
        category: userData.category,
        unitId: unitId,
        title: userData.title,
        description: userData.description,
        unitOwner: userData.unitOwner,
        unitOccupant: userData.unitOccupant,
        price: userData.price,
        numberOfRoom: userData.numberOfRoom,
        grossM2: userData.grossM2,
        netM2: userData.netM2,
        warmingType: userData.warmingType,
        buildingAge: userData.buildingAge,
        floorLocation: userData.floorLocation,
        availableForLoan: userData.availableForLoan,
        furnished: userData.furnished,
        parking: userData.parking,
        parkingID: userData.parkingID,
        locker: userData.locker,
        rentalIncome: userData.rentalIncome,
        province: userData.province,
        city: userData.city,
        neighborhood: userData.neighborhood,
        file: '', // Add other fields as needed
      });

      setLoading(false);


    } catch (error) {
      console.log(error);
      // navigate('/Login');
    }
  };


  useEffect(() => {
    fetchUnitData();
  }, [unitId]);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    formData.interiorFeatures = selectedInteriorFeatures;
    formData.exteriorFeatures = selectedExteriorFeatures;
    try {

      const token = auth?.token;
      // const formDataWithFeatures = {
      //   ...formData,
      //   interiorFeatures: selectedFeatures.interior,
      //   exteriorFeatures: selectedFeatures.exterior
      // };
      const response = await axios.post('http://localhost:5000/propertyinfo', formData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
      });
      console.log(response.data);
      alert(`${response.data.unit_id} updated successfully. Current owner of the property: ${unitOwner} and occupant: ${unitOccupant}`)
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  const handleFileUpload = (event) => {
    console.log(event.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('unitId', unitId);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
      alert('File uploaded Succesfully for unit', unitId)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };


  return (


    <div className="property-management-container">

      <div className="main-content">

        <h1 className="title">Property Profile Management</h1>
        <h2 className="section-title">Category</h2>
        <div className="category-section">
          <div className="dropdown">
            <label htmlFor="housing" className="label-required">Housing</label>
            <select id="housing" name="category" className="select-field" onChange={handleChange} value={formData.category}>
              <option value=""></option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="unit-id" className="label-required">Unit Id</label>
            <select id="unit-id" className="select-field" onChange={(e) => setUnitId(e.target.value)} value={unitId}>
              <option value=""></option>
              <option value="U001">U001</option>
              <option value="U002">U002</option>
              <option value="U003">U003</option>
              <option value="U004">U004</option>
              <option value="U005">U005</option>
              <option value="U006">U006</option>
              <option value="U007">U007</option>
              <option value="U008">U008</option>
              <option value="U009">U009</option>
              <option value="U010">U010</option>
              <option value="U011">U011</option>
              <option value="U012">U012</option>
              <option value="U013">U013</option>
              <option value="U014">U014</option>
              <option value="U015">U015</option>
              <option value="U016">U016</option>
              <option value="U017">U017</option>
              <option value="U018">U018</option>
              <option value="U019">U019</option>
              <option value="U020">U020</option>
            </select>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="property-details-section">
            <h2 className="section-title">Property Details</h2>
            <div className="input-container full-width">
              <label htmlFor="title" className="label-required">Title</label>
              <input id="title" name="title" type="text" className="input-field" onChange={handleChange} value={formData.title} placeholder="Title *" required />
            </div>
            <div className="input-container full-width">
              <label htmlFor="description" className="label-required">Description</label>
              <textarea id="description" name="description" className="input-field" onChange={handleChange} value={formData.description} placeholder="Description *" required />
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="unit-owner" className="label-required">Unit Owner</label>
                <input id="unit-owner" type="text" className="input-field" onChange={(e) => setUnitOwner(e.target.value)} value={unitOwner} placeholder="Unit Owner" required />
              </div>
              <div className="input-container">
                <label htmlFor="unit-occupant" className="label-required">Unit occupant information</label>
                <input id="unit-occupant" type="text" className="input-field" onChange={(e) => setUnitOccupant(e.target.value)} value={unitOccupant} placeholder="Unit Occupant Information" required />
              </div>
            </div>
            <div className="input-container full-width">
              <label htmlFor="price" className="label-required">Price</label>
              <input id="price" name="price" type="text" className="input-field" onChange={handleChange} value={formData.price} placeholder="Price *" required />
            </div>
            <div className="input-container full-width">
              <label htmlFor="number-of-room" className="label-required">Number of Room</label>
              <input id="number-of-room" name="numberOfRoom" type="text" className="input-field" onChange={handleChange} value={formData.numberOfRoom} placeholder="Number of Room *" required />
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="gross-m2" className="label-required">Gross M²</label>
                <input id="gross-m2" name="grossM2" type="text" className="input-field" onChange={handleChange} value={formData.grossM2} placeholder="Gross M² *" required />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="net-m2" className="label-required">Net M²</label>
                <input id="net-m2" name="netM2" type="text" className="input-field" onChange={handleChange} value={formData.netM2} placeholder="Net M² *" required />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="warming-type" className="label-required">Warming Type</label>
                <select id="warming-type" name="warmingType" className="select-field" onChange={handleChange} value={formData.warmingType} placeholder="Warming Type *" required>
                  <option value=""></option>
                  <option value="Central">Central</option>
                  <option value="Electric">Electric</option>
                  <option value="Radiant">Radiant</option>
                </select>
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="building-age" className="label-required">Building Age</label>
                <select id="building-age" name="buildingAge" className="select-field" onChange={handleChange} value={formData.buildingAge} required>
                  <option value=""></option>
                  <option value="New">New</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5 years</option>
                  <option value="6 years">6 years</option>
                </select>
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="floor-location" className="label-required">Floor Location</label>
                <select id="floor-location" name="floorLocation" className="select-field" onChange={handleChange} value={formData.floorLocation} required>
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="available-for-loan" className="label-required">Available for Loan</label>
                <select id="available-for-loan" name="availableForLoan" className="select-field" onChange={handleChange} value={formData.availableForLoan} required>
                  <option value=""></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="input-container full-width">
              <label htmlFor="furnished" className="label-required">Furnished</label>
              <select id="furnished" name="furnished" className="select-field" onChange={handleChange} value={formData.furnished} >
                <option value=""></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="parking" className="label-required">Parking</label>
                <select id="parking" name="parking" className="select-field" onChange={handleChange} value={formData.parking} required>
                  <option value=""></option>
                  <option value="Available">Available</option>
                  <option value="Not-available">Not Available</option>
                </select>
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="parking-spot-id">Parking Spot ID</label>
                <input id="parking-spot-id" name="parkingID" type="text" className="input-field" onChange={handleChange} value={formData.parkingID} placeholder="Parking Spot ID" />
              </div>
            </div>
            <div className="input-container full-width">
              <label htmlFor="locker">Locker</label>
              <select id="locker" name="locker" className="select-field" onChange={handleChange} value={formData.locker}>
              </select>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="rental-income">Rental Income</label>
                <input id="rental-income" name="rentalIncome" type="text" className="input-field" onChange={handleChange} value={formData.rentalIncome} placeholder="Rental Income" />
              </div>
              <div className="input-row">
                <div className="input-container">
                  <label htmlFor="type">Type</label>
                  <select id="type" className="select-field" >
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
                <select id="province" name="province" className="select-field" onChange={handleChange} value={formData.province} required>
                  <option value="">Select Province *</option>
                  <option value="Qc">Quebec</option>
                </select>
              </div>
              <div className="input-container">
                <label htmlFor="city" className="label-required">City</label>
                <select id="city" name="city" className="select-field" onChange={handleChange} value={formData.city} required>
                  <option value="">Select City *</option>
                  <option value="Montreal">Montreal</option>
                </select>
              </div>
            </div>
            <div className="input-container full-width">
              <label htmlFor="neighborhood" className="label-required">Neighborhood</label>
              <select id="neighborhood" name="neighborhood" className="select-field" onChange={handleChange} value={formData.neighborhood} required>
                <option value="">Select Neighborhood *</option>
                <option value="Downtown">Downtown</option>
                <option value="Westmount">Westmount</option>
                <option value="Kitsilano">Kitsilano</option>
              </select>
            </div>
          </div>
        </div>
        <div className="property-management-container">
          <AdvertiseFeatures onSaveSelectedInteriorFeatures={setSelectedInteriorFeatures}
            onSaveSelectedExteriorFeatures={setSelectedExteriorFeatures}
            selectedInteriorFeatures={selectedInteriorFeatures}
            selectedExteriorFeatures={selectedExteriorFeatures} />
        </div>
        <div class="containerButton">
          <button class="submitbutton" onClick={handleSubmit}>Submit Information</button>
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
            onChange={handleFileChange}
          />
          <button onClick={handleUpload}>Upload File</button>
        </div>

      </div>
      <div>
        <button onClick={handleOpenPopup} className="submitbutton">
          Send Registration Keys
        </button>
        {isPopupOpen && <RegistrationKey onClose={handleClosePopup} unitId={unitId} registrationKeyRenter={registrationKeyRenter}
            registrationKeyOwner={registrationKeyOwner} />}
      </div>
    </div>
  );
};

export default PropertyProfileManagement;