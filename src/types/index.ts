export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentDateTime: string;
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  type: 'IN_PERSON' | 'TELEMEDICINE';
  symptoms: string;
  notes?: string;
}

export interface AppointmentRequest {
  patientId: number;
  doctorId: number;
  appointmentDateTime: string;
  type: string;
  symptoms: string;
  notes?: string;
}