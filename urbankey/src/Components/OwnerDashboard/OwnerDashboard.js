import React from "react";
import { Link } from "react-router-dom";
import "./OwnerDashboard.css";
import ImageGallery from "./ImageGallery";
import icon1 from "../Images/location-icon-yellow.png";
import face from "../Images/man-face-ex.png";
import icon2 from "../Images/phone-icon.png";
import icon3 from "../Images/email-icon.png";
import icon4 from "../Images/stock-icon.png";
import icon5 from "../Images/radio-button-1.png";
import icon6 from "../Images/radio-button-2.png";
import icon7 from "../Images/money-icon.png";
import icon8 from "../Images/card-icon.png";

const CondoDash = () => {
  return (
    <div className="condo-dash-container">
      <div className="condo-dash-top">
        <h1>Single Person House</h1>
        <img src={icon1} alt="Location Icon" className="condo-dash-icon" />
        <p className="condo-dash-location-name">Montreal, QC</p>
      </div>

      <div className="condo-dash-second-row">
        <ImageGallery />
        <div className="condo-dash-profile-box">
          <div className="condo-dash-face">
            <img src={face} alt="Man Face" />
          </div>
          <Link to="/Profile" className="condo-dash-edit-button">
            Edit profile
          </Link>
          <p className="condo-dash-name">Michael James</p>
          <p className="condo-dash-type">Owner</p>
          <div className="condo-dash-phone">
            <img src={icon2} alt="Phone Icon" />
            <p>+1 438 597 5809</p>
          </div>
          <div className="condo-dash-email">
            <img src={icon3} alt="Email Icon" />
            <p>abc@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="condo-dash-third-row">
        <div className="condo-dash-info-box">
          <p className="condo-dash-general-info">General Information</p>
          <div className="condo-dash-info-left1">
            <p>Condo No.</p>
            <p>Purchase Date</p>
            <p>Housing Shape</p>
            <p>Room + Living Number</p>
            <p>
              Gross / Net M<sup>2</sup>
            </p>
            <p>Warming Type</p>
            <p style={{ marginBottom: "0" }}>Building Age</p>
          </div>
          <div className="condo-dash-info-right1">
            <p style={{ color: "red" }}>0-0002</p>
            <p>20 November 2020</p>
            <p>Apartment</p>
            <p>1 + 1</p>
            <p>
              50 M<sup>2</sup> / 110 M<sup>2</sup>
            </p>
            <p>Natural Gas</p>
            <p style={{ marginBottom: "0" }}>6</p>
          </div>
          <div className="condo-dash-info-left2">
            <p>Floor Location</p>
            <p>Furnished</p>
            <p style={{ marginBottom: "0" }}>Front</p>
          </div>
          <div className="condo-dash-info-right2">
            <p>2</p>
            <p>Yes</p>
            <p style={{ marginBottom: "0" }}>Northwest</p>
          </div>
        </div>

        <div className="condo-dash-financial-status-box">
          <div className="condo-dash-financial-status">
            <img src={icon4} alt="Stock Icon" />
            <p>Financial Status</p>
          </div>
          <div className="condo-dash-condo-fees">
            <img src={icon5} alt="Radio Button 1" />
            <p>Monthly Condo Fees: $4568</p>
            <img src={icon7} alt="Money Icon" style={{ width: "10.5%" }} />
          </div>
          <div className="condo-dash-condo-fees" style={{ border: "none" }}>
            <img src={icon6} alt="Radio Button 2" />
            <p>Monthly Condo Fees: $4568</p>
            <img src={icon8} alt="Card Icon" style={{ width: "10.5%" }} />
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CondoDash;
