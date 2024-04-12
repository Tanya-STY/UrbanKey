import React, { useState, useEffect } from 'react';
import './DailyOperations.css';

const DailyOperations = () => {

    // Function to generate mock operations
    const generateOperations = (numOperations) => {
        const operations = [];
        for (let i = 0; i < numOperations; i++) {
            operations.push({
                id: i,
                condoOwner: `Condo Owner ${i + 1}`,
                requestTitle: `Request Title ${i + 1}`,
                description: `Description ${i + 1}`,
                contactNumber: `123-456-${i + 1000}`,
                email: `email${i + 1}@example.com`,
                status: '',
            });
        }
        return operations;
    };

    // Function to handle status selection for a specific operation
    const handleStatusChange = (event, id) => {
        const { value } = event.target;
        setOperations(prevOperations =>
            prevOperations.map(operation =>
                operation.id === id ? { ...operation, status: value } : operation
            )
        );
    };

    const [selectedStatus, setSelectedStatus] = useState(''); // Define the status
    const [operations, setOperations] = useState(generateOperations(10)); // Initialize operations
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term
    const [filteredOperations, setFilteredOperations] = useState([]); // State to store filtered operations

    useEffect(() => {
        // Filter operations based on search term
        const filteredOperations = operations.filter(operation =>
            (operation.condoOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            operation.contactNumber.includes(searchTerm) ||
            operation.email.toLowerCase().includes(searchTerm.toLowerCase())) 
        );

        setFilteredOperations(filteredOperations);
    }, [searchTerm, operations]);

    return (
        <div className='operations-box'>
            <div className='operations-top'>
                <h1>Daily Operations</h1>
            </div>

            {/* Search bar */}
            <div className='operations-search'>
                <input
                    type="text"
                    placeholder="Search by name, contact number, email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table for displaying operations*/}
            <div className='operations-table'>
                <h1>Operations</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Condo Owner</th>
                            <th>Request Title</th>
                            <th>Description</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through filtered reservations array and render rows */}
                        {filteredOperations.map((operation) => (
                            <tr key={operation.id}>
                                <td>{operation.condoOwner}</td>
                                <td>{operation.requestTitle}</td>
                                <td>{operation.description}</td>
                                <td>{operation.contactNumber}</td>
                                <td>{operation.email}</td>
                                <td><select 
                                        value={operation.status} 
                                        onChange={(e) => handleStatusChange(e, operation.id)}>
                                    <option value="">Select status</option>
                                    <option value="not_yet">Not yet</option>
                                    <option value="in_process">In process</option>
                                    <option value="done">Done</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default DailyOperations;

