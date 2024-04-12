import React, { useState, useEffect } from "react";
import "./Reservation.css"; // Import the CSS file
import DropdownMenu from "./DropdownMenu";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { Container, Row, Col } from "react-bootstrap";
import { getDay, isBefore, format } from "date-fns";
import { enUS } from 'date-fns/locale';
import axios from 'axios';
import useAuth from '../../CustomeHooks/useAuth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const Reservation = () => {
  const { auth, setAuth } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availability, setAvailability] = useState({});
  const [selectedFacility, setSelectedFacility] = useState(""); // Changed initial state to an empty string
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reservedTimeSlots, setReservedTimeSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const fetchReservations = async (facility, date) => {
    try {
      const response = await axios.post('http://localhost:5000/GetReservations', { facility, date });
      const reservations = response.data;
      const reservedSlots = reservations.map(reservation => reservation.time_slot);
      setReservedTimeSlots(reservedSlots);
  
      const availabilityData = timeSlots.reduce((acc, timeSlot) => {
        acc[timeSlot] = !reservedSlots.includes(timeSlot);
        return acc;
      }, {});
      setAvailability(availabilityData);
      console.log("Availability Data:", availabilityData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    if (selectedFacility && selectedDate) {
      fetchReservations(selectedFacility, format(selectedDate, 'yyyy-MM-dd'));
    }
  }, [selectedFacility, selectedDate]); 


  const modifiers = {
    disabled: (date) => getDay(date) === 0 || getDay(date) === 7 // Disables Saturdays
  };

  // Function to disable past dates in the calendar
  const disabledDates = (date) => {
    return isBefore(date, new Date());
  };

  // Function to handle date selection
  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate); // Update selectedDate state
    setDate(selectedDate); // Update the current date as well
  };

  // Function to handle time slot selection
  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

   // Define an array of time slots
   const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
    "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
  ];
  const setSelectedFacility2 = (value)=>{
    setSelectedFacility(value);
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

    if (!selectedFacility) {
      setErrorMessage("Please select a facility");
      console.log("Facility:", selectedFacility)
      setSuccessMessage("");
    } else if (!selectedDate) {
      setErrorMessage("Please select a date");
      setSuccessMessage("");
    } else if (!selectedTimeSlot) {
      setErrorMessage("Please select a time");
      setSuccessMessage("");
    } else {
      const token = auth?.token;
      const email = auth?.email;
      // Submit the data
      setErrorMessage("");
      setSuccessMessage("Reservation successfully submitted!");
      console.log("Facility:", selectedFacility);
      console.log("Date:", selectedDate);
      console.log("Time:", selectedTimeSlot);

      const reservationData = {
        email: email,
        facility: selectedFacility,
        date: format(selectedDate, "yyyy-MM-dd"),
        time_slot: selectedTimeSlot
      }

      axios.post('http://localhost:5000/MakeReservation', reservationData,{
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    })
      .then(response => {
        // Handle success
        console.log('Reservation made successfully:', response.data);
        toggleModal();
      })
      .catch(error => {
        // Handle error
        console.error('Error making reservation:', error.response.data);
      });
  }
  };

  const SuccessModal = ({ show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Made Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your reservation has been successfully made.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  

  return (
    <div><SuccessModal show={showModal} handleClose={toggleModal} />
      <div className="title-rectangular">
        {/* This div spans the entire width of the page */}
        <h1 className="title-text"> Facility Reservation System</h1>
      </div>

    { /* -----------------LEFT DIV FOR FACILITY SELECTION AND TIME -----------------*/}
      <div className="reservation-container">
        <div className="reservation-selection">
          <div className="selection-row1">
            <h3 className="title-selection"> Select a facility: </h3>
          </div>
          <div className="selection-row2">
            {/* Added onChange handler to update selectedFacility state */}
            <DropdownMenu onChange={(facility) => setSelectedFacility(facility)} setSelectedFacility2={setSelectedFacility2} />
          </div>
          <div className="selection-row3">
                <div className="grid-container">
                    {timeSlots.map((timeSlot, index) => (
                        <div
                        key={index}
                        className={`time-slot ${!availability[timeSlot] ? 'unavailable' : ''} ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
                        onClick={() => !availability[timeSlot] ? null : handleTimeSlotClick(timeSlot)}
                        >
                        {timeSlot}
                        </div>
                    ))}
                    </div>
        
          </div>
        </div>

        { /* -----------------RIGHT DIV FOR CALENDAR/DATE SELECTION AND TIME -----------------*/}

        <div className="reservation-calendar">
            <div className="calendarPick">
          <div className="calendar-row1">
            <h3 className="title-calendar"> Select a date: </h3>
          </div>

          {/* -----------------------CALENDAR-------------------------- */}
          <div className="calendar-row2">
            <Container fluid>
              <Row style={{ justifyContent: "center" }}>
                <Col xs={7} md={6}>
                  <div style={{ textAlign: "center" }}>
                    {/* Added textAlign style */}
                    Selected Date:{" "}
                    {date ? format(date, "MM/dd/yyyy") : ""}
                  </div>
                  <DatePickerCalendar
                    date={date}
                    onDateChange={handleDateChange}
                    modifiers={{ ...modifiers, disabled: disabledDates }}
                    locale={enUS} 
                  />
                </Col>
              </Row>
            </Container>
          </div>
          {/* -----------------------CALENDAR--------------------------- */}
        </div>
        </div>
      </div>
      <div className="submit-rectangular">
        <button onClick={handleSubmit} className="submit-button">Submit</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} 
      </div>
    </div>
    
  );
};

export default Reservation;