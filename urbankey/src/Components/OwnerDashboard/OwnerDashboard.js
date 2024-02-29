import React from "react";
import "./OwnerDashboard.css";
import icon from "../Images/location-icon-yellow.png";
import ImageGallery from "./ImageGallery";
import face from "../Images/man-face-ex.png";

const CondoDash = () => {
  return (
    <div className="condo-dash-container">
      <div className="condo-dash-top">
        <h1>Single Person House</h1>
        <img src={icon} alt="Location Icon" className="condo-dash-icon" />
        <p className="condo-dash-location-name">Montreal, QC</p>
      </div>
      <div className="condo-dash-second-row">
        <ImageGallery />
        <div className="condo-dash-box-1">
          <div className="condo-dash-face">
            <img src={face} alt="Man Face" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CondoDash;
