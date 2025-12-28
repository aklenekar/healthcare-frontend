import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { AppointmentRequest } from '../../types';
import { appointmentService } from '../../services/appointmentService';

interface Props {
  open: boolean;
  onClose: () => void;
  patientId: number;
  onSuccess: () => void;
}

const AppointmentForm: React.FC<Props> = ({ open, onClose, patientId, onSuccess }) => {
  const [formData, setFormData] = useState<AppointmentRequest>({
    patientId: patientId,
    doctorId: 1, // In real app, fetch from doctors list
    appointmentDateTime: '',
    type: 'TELEMEDICINE',
    symptoms: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentService.createAppointment(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book New Appointment</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Doctor ID"
              type="number"
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: Number(e.target.value) })}
              required
            />
            <TextField
              label="Appointment Date & Time"
              type="datetime-local"
              value={formData.appointmentDateTime}
              onChange={(e) => setFormData({ ...formData, appointmentDateTime: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              select
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <MenuItem value="TELEMEDICINE">Telemedicine</MenuItem>
              <MenuItem value="IN_PERSON">In Person</MenuItem>
            </TextField>
            <TextField
              label="Symptoms"
              multiline
              rows={3}
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              required
            />
            <TextField
              label="Additional Notes"
              multiline
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Book Appointment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppointmentForm;