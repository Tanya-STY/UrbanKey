import React, { useState, useEffect } from 'react';
import './ReservationPageCompany.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationPageCompany = () => {
    // Define the time slots
    const timeSlots = [
        '8am-9am', '9am-10am', '10am-11am', '11am-12pm', '12pm-1pm', '1pm-2pm', '2pm-3pm', '3pm-4pm',
        '4pm-5pm', '5pm-6pm', '6pm-7pm', '7pm-8pm', '8pm-9pm', '9pm-10pm', '10pm-11pm', '11pm-12am'
    ];

    // Define the facilities
    const facilities = ['Sky Lounge', 'Spa & Fitness'];

    // Function to generate reservations for a range of dates
    const generateReservations = (startDate, endDate) => {
        const reservations = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            timeSlots.forEach((timeSlot) => {
                facilities.forEach((facility) => {
                    reservations.push({
                        time: timeSlot,
                        facility,
                        fullName: '',
                        contactNumber: '',
                        email: '',
                        date: new Date(currentDate),
                    });
                });
            });
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next date
        }
        return reservations;
    };

    const [reservations, setReservations] = useState(generateReservations(new Date(), new Date())); // Initialize reservations for a range of dates
    const [newReservation, setNewReservation] = useState({
        fullName: '',
        facility: '',
        contactNumber: '',
        email: '',
        time: '', // Added time slot field to new reservation state
        date: new Date(), // Added date field to new reservation state
    });
    const [showForm, setShowForm] = useState(false); // State to control form visibility
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term
    const [checkedFacilities, setCheckedFacilities] = useState([...facilities]); // State to store checked facilities
    const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date
    const [filteredReservations, setFilteredReservations] = useState([]); // State to store filtered reservations
    const [availableTimeSlots, setAvailableTimeSlots] = useState([...timeSlots]); // State to store available time slots, initialized with all time slots

    useEffect(() => {
        // Filter reservations based on search term and checked facilities
        const filteredReservations = reservations.filter(reservation =>
            (reservation.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.contactNumber.includes(searchTerm) ||
            reservation.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            checkedFacilities.includes(reservation.facility)
        );

        setFilteredReservations(filteredReservations);
    }, [searchTerm, checkedFacilities, reservations]);

    
    useEffect(() => {
        // Update available time slots when facility or date changes
        if (newReservation.facility && newReservation.date) {
            const availableTimeSlots = getAvailableTimeSlots(newReservation.facility, newReservation.date);
            setAvailableTimeSlots(availableTimeSlots);
            // Reset the selected time slot if it's not available anymore
            if (!availableTimeSlots.includes(newReservation.time)) {
                setNewReservation(prevState => ({ ...prevState, time: '' }));
            }
        } else {
            // If facility or date is not chosen, set available time slots to all time slots
            setAvailableTimeSlots([...timeSlots]);
        }
    }, [newReservation.facility, newReservation.date]);

    // Function to filter out reserved time slots for the selected facility and date
    const getAvailableTimeSlots = (facility, date) => {
        const reservedTimeSlots = reservations
            .filter(reservation => reservation.facility === facility && reservation.date.getTime() === date.getTime())
            .map(reservation => reservation.time);
        
        return timeSlots.filter(timeSlot => !reservedTimeSlots.includes(timeSlot));
    };

    const handleTimeSlotChange = (e) => {
        setNewReservation({ ...newReservation, time: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Find the index of the existing reservation for the chosen time slot, facility, and date
        const index = reservations.findIndex(reservation =>
            reservation.time === newReservation.time &&
            reservation.facility === newReservation.facility &&
            reservation.date.getTime() === newReservation.date.getTime()
        );
    
        if (index !== -1) {
            // Update the existing reservation with new reservation data
            const updatedReservations = [...reservations];
            updatedReservations[index] = { ...updatedReservations[index], ...newReservation };
            setReservations(updatedReservations);
        } else {
            // Add the new reservation directly to the reservations state
            setReservations([...reservations, newReservation]);
        }
    
        // Reset the form fields
        setNewReservation({
            fullName: '',
            facility: '',
            contactNumber: '',
            email: '',
            time: '', // Reset time slot field
            date: newReservation.date, // Keep the selected date
        });
        // Hide the form after submission
        setShowForm(false);
    };
    
    const handleFacilityCheckboxChange = (facility) => {
        if (checkedFacilities.includes(facility)) {
            setCheckedFacilities(checkedFacilities.filter(item => item !== facility));
        } else {
            setCheckedFacilities([...checkedFacilities, facility]);
        }
    };

    return (
        <div className="reservation-box">
            <div className='reservation-top'>
                <h1>Reservations</h1>
            </div>

            <div className='reservation-search'>
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search by name, contact number, email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Add button to toggle form visibility */}
                <button onClick={() => setShowForm(!showForm)}>New Reservation</button>
                {/* Add form for creating new reservation */}
                {showForm && (
                    <div className="reservation-form">
                        <h2>Create New Reservation</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="fullName">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={newReservation.fullName}
                                onChange={(e) => setNewReservation({ ...newReservation, fullName: e.target.value })}
                                required
                            />
                            
                            <label htmlFor="facility">Facility:</label>
                            <select
                                id="facility"
                                name="facility"
                                value={newReservation.facility}
                                onChange={(e) => setNewReservation({ ...newReservation, facility: e.target.value })}
                                required
                            >
                                <option value="">Select Facility</option>
                                {facilities.map(facility => (
                                    <option key={facility} value={facility}>{facility}</option>
                                ))}
                            </select>
                            
                            <label htmlFor="date">Date:</label>
                            <DatePicker
                                selected={newReservation.date}
                                onChange={(date) => setNewReservation({ ...newReservation, date })}
                                minDate={new Date()} // Set minimum date to the current date
                                dateFormat="MM/dd/yyyy"
                                className="date-picker"
                            />

                            <label htmlFor="time">Time Slot:</label>
                            <select
                                id="time"
                                name="time"
                                value={newReservation.time}
                                onChange={handleTimeSlotChange}
                                required
                                disabled={!newReservation.date || !newReservation.facility} // Disable time slot selection if date or facility not chosen
                            >
                                <option value="">Select Time Slot</option>
                                {availableTimeSlots.map(timeSlot => (
                                    <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                                ))}
                            </select>

                            
                            <label htmlFor="contactNumber">Contact Number:</label>
                            <input
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                value={newReservation.contactNumber}
                                onChange={(e) => setNewReservation({ ...newReservation, contactNumber: e.target.value })}
                                required
                            />
                            
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={newReservation.email}
                                onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                                required
                            />
                            
                            <button type="submit">Create Reservation</button>
                        </form>
                    </div>
                )}
            </div>

            {/* Add div containing facility checkboxes and date picker */}
            <div className="facility-checkboxes">
                {facilities.map(facility => (
                    <label key={facility}>
                        <input
                            type="checkbox"
                            checked={checkedFacilities.includes(facility)}
                            onChange={() => handleFacilityCheckboxChange(facility)}
                        />
                        {facility}
                    </label>
                ))}
                {/* Date picker */}
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    className="date-picker"
                />
            </div>

            <div className='reservation-table'>
                <h1>Reservations</h1>
                {/* Table for displaying reservations */}
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Facility</th>
                            <th>Full Name</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through filtered reservations array and render rows */}
                        {filteredReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td>{reservation.time}</td>
                                <td>{reservation.facility}</td>
                                <td>{reservation.fullName}</td>
                                <td>{reservation.contactNumber}</td>
                                <td>{reservation.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReservationPageCompany;