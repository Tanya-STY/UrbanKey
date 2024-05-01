import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './ManagerEmployeePage.css';
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
import {useState, useEffect} from "react";
import useAuth from "../../CustomeHooks/useAuth";
import axios from "axios";



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

export default function DataGridDemo() {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    const newdata = [];
    const fetchUserData = async () => {
        const token = auth?.token;
        try {
          const response = await axios.get("http://localhost:5000/getEmployeeInfo", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          // const response = await axiosPrivate.get("/renter");
          const data1 = response.data;
          for (let i = 0; i < data1.employe_list.length; i++) {
            const employee = {
                email: data1.employe_list[i].email,
                full_name: data.employe_list[i].full_name,
                num: data1.employe_list[i].num
            }
            newdata.push(employee);
        }
          setLoading(false);
          
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchUserData();
        // fetchUnitPics();
      }, []);

      
    const [searchValue, setSearchValue] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);

      console.log(newdata);

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchValue(keyword);
        const filteredData = rows.filter(row =>
            row.name.toLowerCase().includes(keyword) ||
            row.id.toLowerCase().includes(keyword) ||
            row.role.toLowerCase().includes(keyword) ||
            row.companyName.toLowerCase().includes(keyword)
        );
        setFilteredRows(filteredData);
    };

    return (
        <div className="employee-container-managerPage">
            <div className="employee-top-btns-managerPage">
                <div className="employee-heading-managerPage">
                    <h1 className="employee-header-managerPage">
                        Hello manager,
                    </h1>
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
                    <button className="search-btn-managerPage" > <IoFilter className="filter-icon" />
                        Filter</button>
                </div>

            </div>
            <Box className="employee-box-managerPage">
                <DataGrid
                    className="employee-data-grid"
                    rows={filteredRows}
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
