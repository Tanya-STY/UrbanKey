import React, { useState } from 'react';
import './MaintenanceRequest.css'; 

const MaintenanceRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit action 
    console.log('Submitted:', { title, description });
  };

  return (
    <div className="maintenance-request-form">
      <h1>Maintenance Requests</h1>
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
        <button type="submit" className="submit-button">
          Submit Your Request
        </button>
      </form>
    </div>
  );
};

export default MaintenanceRequestForm;