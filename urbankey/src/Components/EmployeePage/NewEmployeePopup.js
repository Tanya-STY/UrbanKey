import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "@fontsource/space-grotesk/500.css";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/500.css"; // Defaults to weight 400
import "./NewEmployeePopup.css";


function NewEmployeePopup({ open, onClose, onAdd }) {
    const [formData, setFormData] = React.useState({
        name: '',
        id: (Math.floor(Math.random() * 1000000)).toString(),
        role: '',
        status: 'Inactive',
        companyName: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose(); // Close the popup after adding
        setFormData({ name: '', id: (Math.floor(Math.random() * 1000000)).toString(), role: '', status: 'Inactive', companyName: '' }); // Reset form data
    };




    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{
                fontFamily: 'Space Grotesk',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '25px',
                color: '#101828',
            }}>
                Add New Employee
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField classname="NewEmployeePopup-textInput"
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}

                    />
                    <TextField classname="NewEmployeePopup-textInput"
                        margin="dense"
                        label="Role"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}

                    />
                    <TextField classname="NewEmployeePopup-textInput"
                        margin="dense"
                        label="Company Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}

                    />
                    <Button className="addNewEmployee-btn" type="submit" fullWidth>
                        Add Employee
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default NewEmployeePopup;
