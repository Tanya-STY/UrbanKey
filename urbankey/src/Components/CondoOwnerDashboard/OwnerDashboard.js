import React from "react";
import { Link } from "react-router-dom";
// import { Map, GoogleApiWrapper } from "google-maps-react";
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
import icon9 from "../Images/stock-up-icon.png";

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
          <p className="condo-dash-headertwo">General Information</p>
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

        <div className="condo-dash-financial-and-request-box">
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
            <p>Outstanding Balances: $0</p>
            <img src={icon8} alt="Card Icon" style={{ width: "10.5%" }} />
          </div>
          <div className="condo-dash-payment-history">
            <p>Payment History</p>
            <Link to="/PaymentHistory" className="condo-dash-view-link">
              View
            </Link>
          </div>
        </div>
      </div>

      <div className="condo-dash-fourth-row">
        <div className="condo-dash-info-box" style={{ width: "100%" }}>
          <p className="condo-dash-headertwo">Explanation</p>
          <p className="condo-dash-explanation">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
            aliquet lectus proin nibh nisl condimentum id. Nisl pretium fusce id
            velit ut tortor pretium viverra. Turpis massa sed elementum tempus
            egestas sed.
          </p>
        </div>
      </div>

      <div className="condo-dash-fifth-row">
        <div className="condo-dash-info-box">
          <div className="condo-dash-feature">
            <p
              style={{
                color: "black",
                fontWeight: "600",
                fontSize: "1.3vw",
                marginBottom: " 2%",
              }}
            >
              Interior Features
            </p>
            <p>✓ ASDL</p>
            <p>✓ Alarm</p>
            <p>✓ Balcony</p>
            <p>✓ Barbecue</p>
            <p>✓ Laundry Room</p>
            <p>✓ Wallpaper</p>
            <p>✓ Dressing room</p>
            <p>✓ Video Intercom</p>
            <p>✓ Shower</p>
            <p>✓ Laminate</p>
            <p>✓ Panel Door</p>
            <p>✓ Blinds</p>
            <p>✓ Sauna</p>
            <p>✓ Satin Plaster</p>
            <p>✓ Satin Color</p>
            <p>✓ Ceramic Floor</p>
          </div>
          <div
            className="condo-dash-feature"
            style={{ position: "relative", bottom: "27.5%" }}
          >
            <p
              style={{
                color: "black",
                fontWeight: "600",
                fontSize: "1.3vw",
                marginBottom: " 2%",
              }}
            >
              Exterior Features
            </p>
            <p>✓ Elevator</p>
            <p>✓ Garden</p>
            <p>✓ Fitness</p>
            <p>✓ Security</p>
            <p>✓ Thermal Insulation</p>
            <p>✓ Generator</p>
            <p>✓ Tennis Court</p>
            <p>✓ Car Park</p>
            <p>✓ PVC</p>
            <p>✓ Basketball Field</p>
            <p>✓ Market</p>
          </div>
        </div>

        <div
          className="condo-dash-financial-and-request-box"
          style={{ marginBottom: "11%", marginTop: "8%" }}
        >
          <div className="condo-dash-maintenance">
            <img src={icon9} alt="Stock Up Icon" />
            <p>Maintenance Requests</p>
          </div>

          <div className="condo-dash-requests">
            <p className="condo-dash-nb-request">Request #001</p>
            <p
              className="condo-dash-progress"
              style={{
                padding: "1% 7.5%",
                backgroundColor: "#FFBAFF",
                border: "1px solid #E100E1",
              }}
            >
              In Progress
            </p>
          </div>

          <div className="condo-dash-requests">
            <p className="condo-dash-nb-request">Request #002</p>
            <p
              className="condo-dash-progress"
              style={{
                padding: "1% 7.5%",
                backgroundColor: "#BAEB9C",
                border: "1px solid #56E100",
              }}
            >
              Completed
            </p>
          </div>

          <div className="condo-dash-requests" style={{ borderBottom: "none" }}>
            <p className="condo-dash-nb-request"> Request #003</p>
            <p
              className="condo-dash-progress"
              style={{
                padding: "1% 9%",
                backgroundColor: "#838FFF",
                border: "1px solid #0017E1",
              }}
            >
              Pending
            </p>
          </div>

          <div className="condo-dash-submit">
            <Link to="/Maintenance" className="condo-dash-request-link">
              Submit a New Request
            </Link>
          </div>
        </div>
      </div>

      <div className="condo-dash-sixth-row">
        <div className="condo-dash-info-box" style={{ width: "100%" }}>
          <div className="condo-dash-headertwo">Location Information</div>
          <iframe
            title="map"
            width="100%"
            height="400"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Montreal,%20Canada+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps tracker sport</a>
          </iframe>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CondoDash;