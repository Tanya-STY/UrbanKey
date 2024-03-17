import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './Employee.css';
import "@fontsource/space-grotesk/500.css";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/500.css"; // Defaults to weight 400
import { IoDownloadOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import {CSVLink} from "react-csv";
import { GoDotFill } from "react-icons/go";






const columns = [
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        headerClassName: 'employee-data-grid-header-column',
    },
    {
        field: 'id',
        headerName: 'Employee ID',
        width: 200,
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
                padding: '5px'
            }}>
                {params.value}
            </div>
        )

    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
        headerClassName: 'employee-data-grid-header-column',
        renderCell: (params) => (
            <div style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                color: '#42526D',
            }}>
                {params.value}
            </div>
        )

    },
    {
        field: 'status',
        headerName: 'Status',
        width: 200,
        headerClassName: 'employee-data-grid-header-column',
        renderCell: (params) => (
            <div style={{
                background: params.value === 'Active' ? '#ECFDF3' : params.value === 'Inactive' ? '#FFF2EA' : 'transparent',
                borderRadius:'16px',
                padding: '5px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                color: params.value === 'Active' ? '#027A48' : params.value === 'Inactive' ? '#F15046' : 'transparent',
                fontSize: '12px'
            }}>
                <GoDotFill style={{ color: params.value === 'Active' ? '#12B76A' : params.value === 'Inactive' ? '#F15046' : 'transparent' }} />
                {params.value}
            </div>
        )

    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 200,
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
                padding: '5px'
            }}>
                {params.value}
            </div>
        )
    },
];

const rows = [
    { id: '#23454GH6J7YT6', name: 'Tanner Fisher', role: 'manager' , status:'Active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT7', name: 'Tanner Fisher', role: 'manager' , status:'Active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT8', name: 'Tanner Fisher', role: 'manager' , status:'Inactive' , companyName:'Building Company' },
    { id: '#23454GH6J7YT9', name: 'Tanner Fisher', role: 'manager' , status:'Active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT1', name: 'Tanner Fisher', role: 'manager' , status:'Inactive' , companyName:'Building Company' },
    { id: '#23454GH6J7YT2', name: 'Tanner Fisher', role: 'manager' , status:'Active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT3', name: 'Tanner Fisher', role: 'manager' , status:'Inactive' , companyName:'Building Company' },
    { id: '#23454GH6J7YT4', name: 'Tanner Fisher', role: 'manager' , status:'Inactive' , companyName:'Building Company' },
    { id: '#23454GH6J7YT5', name: 'Tanner Fisher', role: 'manager' , status:'Active' , companyName:'Building Company' },
];

export default function DataGridDemo() {
    const numberOfRows = rows.length;
    const csvData = [
        { name: 'Name', id: 'Employee ID', role: 'Role', status: 'Status', companyName: 'Company Name' },
        ...rows
    ];

    return (
        <div className="employee-container">
            <div className="employee-top-btns">
            <div className="employee-heading">
                <h1 className="employee-header">
                    Employees
                    <IoIosHelpCircleOutline className="help-icon"/>
                    <span className="number-of-rows">{numberOfRows}</span>
                </h1>
                <div className="employee-btn">
                    <CSVLink data={csvData} filename={"employee_data.csv"} className="export-btn">
                        <IoDownloadOutline className="download-icon" />
                        Export
                    </CSVLink>
                    <button className="new-employee-btn">
                    <IoIosAddCircleOutline className="add-icon"/>
                    New Employees</button>
                </div>
            </div>
            <div className="employee-types">
                <button className="employee-type-btn">Teams</button>
                <button className="employee-type-btn">Roles</button>
                <button className="employee-type-btn">All Employees</button>
            </div>
                <div className="search-container">
                    <CiSearch className="search-icon" />
                    <input
                        className="employee-search"
                        placeholder="Search Employee by name, role, ID, or any related keywords"
                    />
                    <div className="search-btns">
                        <button className="search-btn" > <IoFilter className="filter-icon" />
                            Filter</button>
                        <button className="search-btn"> <IoIosList className="list-icon" />
                        </button>
                        <button className="search-btn"> <CiGrid41 className="grid-icon"/>
                        </button>
                    </div>
                </div>
            </div>
            <Box className="employee-box">
                <DataGrid
                    className="employee-data-grid"
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    pageSizeOptions={[8]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}
