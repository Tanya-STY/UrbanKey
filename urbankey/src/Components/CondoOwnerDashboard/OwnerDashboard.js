import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import { saveAs } from 'file-saver';
// import { Map, GoogleApiWrapper } from "google-maps-react";
import "./OwnerDashboard.css";
import ImageGallery from "./ImageGallery";
import "./ImageGallery.css";
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
import useAuth from '../../CustomeHooks/useAuth';
import axios from 'axios';
import PaymentHistoryOwner from "../Popups/PaymentHistoryOwner";
import MaintenanceRequestForm from "../Popups/MaintenanceRequest";

const CondoOwnerDash = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  const [showPopup2, setShowPopup2] = useState(false);

  const openPopup2 = () => {
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };

  // the month pay is the monthly payment (which is the same every month for a condo owner), 
  // it is seen in the financial status and it is sent to the payment history as well
  const [monthPay, setMonthPay] = useState(5534.00);

  const { auth, unit } = useAuth();
  const unit_id = unit?.unit_id;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [num, setNum] = useState('');
  const [renter, setRenter] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [numberOfRoom, setNumberOfRoom] = useState('');
  const [grossM2, setGrossM2] = useState('');
  const [netM2, setNetM2] = useState('');
  const [warmingType, setWarmingType] = useState('');
  const [buildingAge, setBuildingAge] = useState('');
  const [floorLocation, setFloorLocation] = useState('');
  const [availableForLoan, setAvailableForLoan] = useState('');
  const [furnished, setFurnished] = useState('');
  const [parking, setParking] = useState('');
  const [parkingID, setParkingID] = useState('');
  const [locker, setLocker] = useState('');
  const [rentalIncome, setRentalIncome] = useState('');
  const [province_unit, setProvinceUnit] = useState('');
  const [city_unit, setCityUnit] = useState('');
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [unitId, setUnitId] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [bigImage, setBigImage] = useState('');
  const [smallImages, setSmallImages] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const fetchUserData = async () => {

    try {
      const token = auth?.token;
      const response = await axios.get("https://urbankey-backend.onrender.com/Profile",
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
      // const response = await axiosPrivate.get("/renter");
      const userData = response.data;
      setName(userData.name);
      setEmail(userData.email);
      setNum(userData.num);
      setRenter(userData.renter);
      setUnitId(userData.unit_id);
      setProvinceUnit(userData.province_unit);
      setCityUnit(userData.city_unit);
      setDescription(userData.description);
      setTitle(userData.title);
      setCategory(userData.category);
      setPrice(userData.price);
      setNumberOfRoom(userData.numberOfRoom);
      setGrossM2(userData.grossM2);
      setNetM2(userData.netM2);
      setWarmingType(userData.warmingType);
      setBuildingAge(userData.buildingAge);
      setFloorLocation(userData.floorLocation);
      setAvailableForLoan(userData.availableForLoan);
      setFurnished(userData.furnished);
      setParking(userData.parking);
      setParkingID(userData.parkingID);
      setLocker(userData.locker);
      setRentalIncome(userData.rentalIncome);
      setInteriorFeatures(userData.interior);
      setExteriorFeatures(userData.exterior);
      console.log(userData.interior);
      setLoading(false)

    } catch (error) {
      console.log(error);

    }
  };

  const renderInteriorFeatures = () => {
    return interiorFeatures.map((feature, index) => (
      <p key={index}>✓ {feature}</p>
    ));
  };

  const renderExteriorFeatures = () => {
    return exteriorFeatures.map((feature, index) => (
      <p key={index}>✓ {feature} </p>
    ));
  };

  const fetchUnitPics = async () => {

    try {
      const token = auth?.token;
      // console.log(token);
      const response = await axios.get(`https://urbankey-backend.onrender.com/api/images/${unitId}`,  //backticks for template strings
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
      setImageUrls(response.data);
      setBigImage(response.data[0]); // Set bigImage to the first image URL from imageUrls
      setSmallImages(response.data.slice(1));
      setLoading(false)

    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      const token = auth?.token;
      const response = await axios.get(`https://urbankey-backend.onrender.com/download-file/${unitId}`, {
        responseType: 'arraybuffer', //binary large object
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      console.log(response.data);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, "unit_details.pdf");

    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchUserData();
    // fetchUnitPics();
  }, [auth]);

  useEffect(() => {
    if (unitId) {
      fetchUnitPics();
    }
  }, [auth, unitId]);

  const handleClick = (image) => {
    setBigImage(image);
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 4 < smallImages.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="condo-dash-container">
      <div className="condo-dash-top">
        <h1>{title}</h1>
        <img src={icon1} alt="Location Icon" className="condo-dash-icon" />
        <p className="condo-dash-location-name">{city_unit}, {province_unit}</p>
      </div>

      <div className="condo-dash-second-row">
        <div className="gallery">
          <div
            className={`gallery-big-image ${isZoomed ? "zoomed" : ""}`}
            onClick={toggleZoom}
          >
            {bigImage && <img src={bigImage} alt="Main" />}
          </div>
          <div className="gallery-small-images">
            {startIndex > 0 && (
              <button className="gallery-left-arrow" onClick={handlePrev}>
                &lt;
              </button>
            )}
            {smallImages.slice(startIndex, startIndex + 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Small ${index + startIndex + 1}`}
                onClick={() => handleClick(image)}
              />
            ))}
            {startIndex + 4 < smallImages.length && (
              <button className="gallery-right-arrow" onClick={handleNext}>
                &gt;
              </button>
            )}
          </div>
        </div>
        <div className="condo-dash-profile-box">
          <div className="condo-dash-face">
            <img src={face} alt="Man Face" />
          </div>
          <Link to="/Profile" className="condo-dash-edit-button">
            Edit profile
          </Link>
          <p className="condo-dash-name">{name}</p>
          <p className="condo-dash-type">Owner</p>
          <div className="condo-dash-phone">
            <img src={icon2} alt="Phone Icon" />
            <p>+1 {num}</p>
          </div>
          <div className="condo-dash-email">
            <img src={icon3} alt="Email Icon" />
            <p>{email}</p>
          </div>
          <div classname="conatainer" style={{ paddingTop: '20px' }}>
            {fileUrl && (
              <Document file={fileUrl}>
                <Page pageNumber={1} />
              </Document>
            )}

            <button onClick={handleDownload} style={{
              backgroundColor: '#008CBA', /* Green */ border: 'none', color: 'white', padding: '15px 32px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '4px 2px',
              cursor: 'pointer',
              borderRadius: '8px',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              transition: '0.3s'
            }}>
              Download File
            </button>
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
            <p style={{ color: "red" }}>{unitId}</p>
            <p>20 November 2020</p>
            <p>{category}</p>
            <p>{numberOfRoom}</p>
            <p>{grossM2} M<sup>2</sup> / {netM2} M<sup>2</sup></p>
            <p>{warmingType}</p>
            <p style={{ marginBottom: "0" }}>{buildingAge}</p>
          </div>

          <div className="condo-dash-info-left2">
            <p>Floor Location</p>
            <p>Furnished</p>
            <p style={{ marginBottom: "0" }}>Front</p>
          </div>
          <div className="condo-dash-info-right2">
            <p>{floorLocation}</p>
            <p>{furnished}</p>
            <p style={{ marginBottom: "0" }}>Northwest</p>
          </div>
        </div>

        <div className="renter-info">
          <p className="condo-dash-renter-info">Renter Contact Information</p>
          {renter ? (
            <>
              <p>Name: {renter.name}</p>
              <p>Email: {renter.email}</p>
              <p>Phone: {renter.num}</p>
            </>
          ) : (
            <p>No renter information available</p>
          )}
        </div>
      </div>

      <div className="condo-dash-fourth-row">
        <div className="condo-dash-info-box">
          <p className="condo-dash-headertwo">Explanation</p>
          <p className="condo-dash-explanation">
            {description}
          </p>
        </div>
        <div className="condo-dash-financial-and-request-box">
          <div className="condo-dash-financial-status">
            <img src={icon4} alt="Stock Icon" />
            <p>Financial Status</p>
          </div>
          <div className="condo-dash-condo-fees">
            <img src={icon5} alt="Radio Button 1" />
            <p>Monthly Condo Fees: {monthPay.toFixed(2)}</p>
            <img src={icon7} alt="Money Icon" style={{ width: "10.5%" }} />
          </div>
          <div className="condo-dash-condo-fees" style={{ border: "none" }}>
            <img src={icon6} alt="Radio Button 2" />
            <p>Outstanding Balances: $0</p>
            <img src={icon8} alt="Card Icon" style={{ width: "10.5%" }} />
          </div>
          <div className="condo-dash-payment-history">
            <p>Payment History</p>
            {/* <Link to="/PaymentHistory" className="condo-dash-view-link">
              View
            </Link> */}
            <button className="condo-dash-view-link" type="submit" onClick={openPopup}>
              View
            </button>
            {showPopup && <PaymentHistoryOwner monthPay={monthPay} onClose={closePopup} />}
          </div>
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
            {renderInteriorFeatures()}

          </div>
          <div
            className="condo-dash-feature"
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
            {renderExteriorFeatures()}

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
            {/* <Link to="/MaintenanceRequest" className="condo-dash-request-link">
              Submit a New Request
            </Link> */}
            <button className="condo-dash-request-link" type="submit" onClick={openPopup2}>
              Submit a New Request
            </button>
            {showPopup2 && <MaintenanceRequestForm onClose={closePopup2} />}
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

export default CondoOwnerDash;