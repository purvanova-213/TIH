import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

export function AddPatients() {
  const [patients, setPatients] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });

  const handleAddClickOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
    setNewPatient({ name: '', age: '', condition: '' });
  };

  const handleEditClickOpen = (patient) => {
    setSelectedPatient(patient);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedPatient({});
  };

  const handleDelete = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleAddPatient = () => {
    const newPatientWithId = { ...newPatient, id: Date.now() };
    setPatients([...patients, newPatientWithId]);
    handleAddClose();
  };

  const handleUpdatePatient = () => {
    const updatedPatients = patients.map((patient) =>
      patient.id === selectedPatient.id ? selectedPatient : patient
    );
    setPatients(updatedPatients);
    handleEditClose();
  };

  return (
    <div>
      <Typography variant="h5">Patients List</Typography>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} ({patient.age} years) - {patient.condition}
            <Button variant="contained" color="primary" onClick={() => handleEditClickOpen(patient)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(patient.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>


      <Dialog open={openAddDialog} onClose={handleAddClose}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter patient details:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Condition"
            fullWidth
            value={newPatient.condition}
            onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddPatient} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update patient details:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={selectedPatient.name}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={selectedPatient.age}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Condition"
            fullWidth
            value={selectedPatient.condition}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, condition: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdatePatient} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>


      <Button variant="contained" color="primary" onClick={handleAddClickOpen}>
        Add New Patient
      </Button>
    </div>
  );
};
