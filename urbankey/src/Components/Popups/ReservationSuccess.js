import React from 'react';
import './ReservationSuccess.css'; 

const SuccessMessage = () => {
  const handleBackHome = () => {
    alert('Navigating home');  
  };


  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h1>Congrats!</h1>
      <p>Reservation has been successfully made.</p>
      <button onClick={handleBackHome} className="back-home">Back to Home</button>
    </div>
  );
};

export default SuccessMessage;