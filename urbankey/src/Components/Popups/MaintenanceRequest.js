import React, { useState } from 'react';
import './MaintenanceRequest.css'; 
import axios from 'axios';
import useAuth from '../../CustomeHooks/useAuth';

const MaintenanceRequestForm = ({ onClose }) => {
  const { auth, setAuth, setUnit } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle submit action
    try {
      const token = auth?.token;
      const response = await axios.post("http://localhost:5000/user/dashboard/newRequest", {
          title, 
          description
      }, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          withCredentials: true
      });
      //set the variables as added in the user requests
  }
  catch (error) {
      console.log(error);
      // alert(error);
  } 

    console.log('Submitted:', { title, description });
    window.location.reload();
  };

  const isTitleValid = title.trim() !== '';
  const isDescriptionValid = description.trim() !== '';

  return (
    <div className="maintenance-request-form">
      <div className='maintenance-form-overlay' onClick={onClose}></div>
      <div className='maintenance-form-popup'>
        <button className='maintenance-close-button' onClick={onClose}>X</button>
      <h1 className='maintenance-title'>Maintenance Requests</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            className="input-title"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of your request"
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Request Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="You can request about moving in/out (date for reserving elevators), intercom changes, requesting access (fobs, keys), reporting a violation, reporting deficiency found in common areas, or asking a question."
          />
        </div>
        <button type="submit" className="submit-button" disabled={!isTitleValid || !isDescriptionValid}> 
          Submit Your Request
        </button>
      </form>
    </div>
    </div>
  );
};

export default MaintenanceRequestForm;