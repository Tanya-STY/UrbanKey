// import React, { useState } from "react";
// import { DatePickerCalendar } from "react-nice-dates";
// import "react-nice-dates/build/style.css";
// import { Container, Row, Col } from "react-bootstrap";
// import { getDay, isBefore, format } from "date-fns";

// function CalendarReservation({ onDateChange }) {
//   const [date, setDate] = useState(new Date());

//   const modifiers = {
//     disabled: (date) => getDay(date) === 0 || getDay(date) === 7 // Disables Saturdays
//   };

//   // Function to disable past dates in the calendar
//   const disabledDates = (date) => {
//     return isBefore(date, new Date());
//   };

//   // Function to handle date selection
//   const handleDateChange = (selectedDate) => {
//     onDateChange(selectedDate); // Call the parent function to update selectedDate
//     setDate(selectedDate); // Update the current date as well
//   };

//   return (
//     <Container fluid>
//       <Row style={{ justifyContent: "center" }}>
//         <Col xs={7} md={6}>
//           <div style={{ textAlign: "center" }}> {/* Added textAlign style */}
//             Selected Date:{" "}
//             {date ? format(date, "MM/dd/yyyy") : ""}
//           </div>
//           <DatePickerCalendar
//             date={date}
//             onDateChange={handleDateChange}
//             modifiers={{ ...modifiers, disabled: disabledDates }}
//           />
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default CalendarReservation;
