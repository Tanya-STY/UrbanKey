import React, { useState, useEffect } from 'react';
import './ReservationPageCompany.css';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const ReservationPageCompany = () => {
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term
    const [filteredReservations, setFilteredReservations] = useState([]); // State to store filtered reservations
    const [facilities, setFacilities] = useState([]);
    const [checkedFacilities, setCheckedFacilities] = useState([...facilities]); // State to store checked facilities

    useEffect(() => {
        axios.get('https://urbankey-backend.onrender.com/GetAllReservations')
            .then(response => {
                setReservations(response.data); 
                const uniqueFacilities = [...new Set(response.data.map(reservation => reservation.facility))];
                setFacilities(uniqueFacilities);
                setCheckedFacilities(uniqueFacilities);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    }, []);

    useEffect(() => {
        // Filter reservations based on search term and checked facilities
        const filteredReservations = reservations.filter(reservation =>
            (reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            checkedFacilities.includes(reservation.facility)
        );

        setFilteredReservations(filteredReservations);
    }, [searchTerm, checkedFacilities, reservations]);

    const handleFacilityCheckboxChange = (facility) => {
        console.log("Toggling facility:", facility);
        if (checkedFacilities.includes(facility)) {
            setCheckedFacilities(checkedFacilities.filter(item => item !== facility));
            console.log("Unchecked:", facility);
        } else {
            setCheckedFacilities([...checkedFacilities, facility]);
            console.log("Checked:", facility);
        }
    };
    


    return (
        <div className="reservation-box">
            <div className='reservation-top'>
                <h1>Reservations</h1>
            </div>

            <div className='reservation-search'>
            <input
                    type="text"
                    placeholder="Search by name, email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

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
            </div>

            <div className='reservation-table'>
                <h1>Reservations</h1>
                {/* Table for displaying reservations */}
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Facility</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through reservations array fetched from the database and render rows */}
                        {filteredReservations.map((reservation, index) => (
                            <tr key={index}>
                                <td>{reservation.date}</td>                                
                                <td>{reservation.time_slot}</td>
                                <td>{reservation.facility}</td>
                                <td>{reservation.name}</td>
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