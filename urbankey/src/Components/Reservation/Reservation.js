import React, { useState, useEffect } from "react";
 import "./Reservation.css"; // Import the CSS file
 import DropdownMenu from "./DropDownMenu";
 import { DatePickerCalendar } from "react-nice-dates";
 import "react-nice-dates/build/style.css";
 import { Container, Row, Col } from "react-bootstrap";
 import { getDay, isBefore, format } from "date-fns";

 const Reservation = () => {
   const [selectedDate, setSelectedDate] = useState(null);
   const [date, setDate] = useState(new Date());
   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
   const [availability, setAvailability] = useState({});
   const [selectedFacility, setSelectedFacility] = useState(""); // Changed initial state to an empty string
   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");

   // Simulated function to fetch availability data
   const fetchAvailability = (selectedDate) => {
     // Simulated API call to fetch availability for selected date
     // This is a placeholder function, replace it with your actual API call
     // In this example, we assume that all time slots are available
     const availabilityData = timeSlots.reduce((acc, timeSlot) => {
       acc[timeSlot] = true; // Available
       return acc;
     }, {});
     setAvailability(availabilityData);
   };

   useEffect(() => {
     if (selectedDate) {
       fetchAvailability(selectedDate);
     }
   }, [selectedDate]);

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

   // Function to handle form submission
   const handleSubmit = () => {
     if (!selectedFacility) {
       setErrorMessage("Please select a facility");
       setSuccessMessage("");
     } else if (!selectedDate) {
       setErrorMessage("Please select a date");
       setSuccessMessage("");
     } else if (!selectedTimeSlot) {
       setErrorMessage("Please select a time");
       setSuccessMessage("");
     } else {
       // Submit the data
       setErrorMessage("");
       setSuccessMessage("Reservation successfully submitted!");
       console.log("Facility:", selectedFacility);
       console.log("Date:", selectedDate);
       console.log("Time:", selectedTimeSlot);
     }
   };


   return (
     <div>
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
             <DropdownMenu onChange={(facility) => setSelectedFacility(facility)} />
           </div>
           <div className="selection-row3">
                 <div className="grid-container">
                     {timeSlots.map((timeSlot, index) => (
                         <div
                         key={index}
                         className={`time-slot ${!availability[timeSlot] ? 'unavailable' : ''} ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
                         onClick={() => handleTimeSlotClick(timeSlot)}
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