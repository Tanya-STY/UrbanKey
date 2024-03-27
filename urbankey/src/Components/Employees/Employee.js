import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './Employee.css';
import "@fontsource/space-grotesk/500.css";

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
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
        headerClassName: 'employee-data-grid-header-column',
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 200,
        headerClassName: 'employee-data-grid-header-column',
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 200,
        headerClassName: 'employee-data-grid-header-column',
    },
];

const rows = [
    { id: '#23454GH6J7YT6', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT7', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT8', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT9', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT1', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT2', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT3', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT4', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
    { id: '#23454GH6J7YT5', name: 'Tanner Fisher', role: 'manager' , status:'active' , companyName:'Building Company' },
];

export default function DataGridDemo() {

    return (
        <div className="employee-container">
            <div>
            <div className="employee-heading">
                <h1 className="employee-header">
                    Employees
                </h1>
                <button>Export</button>
                <button>New Employees</button>
            </div>
            <div>
                <button>Teams</button>
                <button>Roles</button>
                <button>All Employees</button>
            </div>
                <input
                    placeholder="Search Employee by name, role, ID or any related keywords"
                />
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
};