import React from "react";
import "./OwnerDashboard.css";
import icon from "../Images/location-icon-yellow.png";
import ImageGallery from "./ImageGallery";

const CondoDash = () => {
  return (
    <>
      <div className="condo-dash-container">
        <div className="condo-dash-top">
          <h1>Single Person House</h1>
          <img src={icon} alt="Location Icon" className="condo-dash-icon" />
          <p className="condo-dash-location-name">Montreal, QC</p>
        </div>

        <ImageGallery />
      </div>

      <br />
      <br />
    </>
  );
};

export default CondoDash;
