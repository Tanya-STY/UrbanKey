import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './ManagerEmployeePage.css';
import "@fontsource/space-grotesk/500.css";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";

const columns = [
    {
        field: 'condoOwner',
        headerName: 'Condo Owner',
        width: 130,
        headerClassName: 'employee-data-grid-header-column',
        disableColumnMenu: true,
        sortable: false,
    },
    {
        field: 'title',
        headerName: 'Title of the Request',
        width: 130,
        headerClassName: 'employee-data-grid-header-column',
        disableColumnMenu: true,
        sortable: false,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 230, // Adjusted for potentially longer text
        headerClassName: 'employee-data-grid-header-column',
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => (
            <div
                style={{
                    whiteSpace: 'normal',
                    lineHeight: 'normal',
                    padding: '5px',
                }}
            >
                {params.value}
            </div>
        ),
    },
    {
        field: 'contactNumber',
        headerName: 'Contact Number',
        width: 130,
        headerClassName: 'employee-data-grid-header-column',
        disableColumnMenu: true,
        sortable: false,
    },
    {
        field: 'userEmail',
        headerName: 'User Email',
        width: 200, // Emails can be long
        headerClassName: 'employee-data-grid-header-column',
        disableColumnMenu: true,
        sortable: false,
    },
    {
        field: 'assignedEmployee',
        headerName: 'Assigned Employee',
        width: 150,
        headerClassName: 'employee-data-grid-header-column',
        disableColumnMenu: true,
        sortable: false,
    },
    {
        field: 'id',
        headerName: 'ID',
        width: 130,
        headerClassName: 'employee-data-grid-header-column',
        renderCell: (params) => (
            <div style={{
                background: '#F5F6F7',
                borderRadius: '16px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '12px',
                color: '#091E42',
                padding: '5px',
            }}>
                {params.value}
            </div>
        ),
        disableColumnMenu: true,
        sortable: false,
    },
];

const rows = [
    { id: '1', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '2', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '3', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '4', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '5', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '6', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '7', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '8', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '9', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '10', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '11', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
    { id: '12', condoOwner: 'John Doe', title: 'Leak Repair', description: 'Leak in the bathroom ceiling', contactNumber: '123-456-7890', userEmail: 'johndoe@example.com', assignedEmployee: 'Tanner Fisher' },
];

function useResponsivePageSize() {
    const [pageSize, setPageSize] = useState(8);
    useEffect(() => {
        const handleResize = () => {
            setPageSize(window.innerWidth < 768 ? 5 : 8);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return pageSize;
}

export default function DataGridDemo() {
    const [searchValue, setSearchValue] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const pageSize = useResponsivePageSize();

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchValue(keyword);
        const filteredData = rows.filter(row =>
            row.condoOwner.toLowerCase().includes(keyword) ||
            row.title.toLowerCase().includes(keyword) ||
            row.description.toLowerCase().includes(keyword) ||
            row.contactNumber.toLowerCase().includes(keyword) ||
            row.userEmail.toLowerCase().includes(keyword) ||
            row.assignedEmployee.toLowerCase().includes(keyword)
        );
        setFilteredRows(filteredData);
    };

    return (
        <div className="employee-container-managerPage">
            <div className="employee-top-btns-managerPage">
                <div className="employee-heading-managerPage">
                    <h1 className="employee-header-managerPage">Hello manager,</h1>
                    <div className="search-container-managerPage">
                        <CiSearch className="search-icon-managerPage" />
                        <input
                            className="employee-search-managerPage"
                            placeholder="Search Employee by name, role, ID, or any related keywords"
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="employee-types">
                    <button className="employee-type-btn">All Employees</button>
                    <button className="employee-type-btn">Roles</button>
                    <button className="employee-type-btn">Request</button>
                    <button className="search-btn-managerPage"><IoFilter className="filter-icon"/> Filter</button>
                </div>
            </div>
            <Box className="employee-box-managerPage">
                <DataGrid
                    className="employee-data-grid"
                    rows={filteredRows}
                    columns={columns}
                    pageSize={pageSize}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}