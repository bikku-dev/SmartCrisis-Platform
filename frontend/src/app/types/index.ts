export type EmergencyType = 
  | 'medical' 
  | 'fire' 
  | 'accident' 
  | 'natural_disaster' 
  | 'violence' 
  | 'other';

export type EmergencySeverity = 'critical' | 'high' | 'medium' | 'low';

export type EmergencyStatus = 
  | 'reported' 
  | 'dispatched' 
  | 'en_route' 
  | 'on_scene' 
  | 'resolved' 
  | 'cancelled';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Emergency {
  id: string;
  type: EmergencyType;
  severity: EmergencySeverity;
  status: EmergencyStatus;
  description: string;
  location: Location;
  reportedBy: string;
  reportedAt: Date;
  assignedTo?: string;
  assignedHospital?: string;
  eta?: number;
  aiConfidence: number;
  riskScore: number;
  patientDetails?: {
    age?: number;
    gender?: string;
    medicalHistory?: string[];
    vitals?: {
      heartRate?: number;
      bloodPressure?: string;
      oxygenLevel?: number;
      temperature?: number;
    };
  };
}

export interface Hospital {
  id: string;
  name: string;
  location: Location;
  distance: number;
  availableBeds: number;
  icuBeds: number;
  emergencyCapacity: 'high' | 'medium' | 'low';
  specializations: string[];
  contactNumber: string;
  avgResponseTime: number;
  rating: number;
}

export interface Volunteer {
  id: string;
  name: string;
  location: Location;
  status: 'available' | 'busy' | 'offline';
  specialization: string[];
  rating: number;
  completedEmergencies: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'volunteer' | 'admin';
  location?: Location;
  emergencyContacts: EmergencyContact[];
  medicalInfo?: {
    bloodType?: string;
    allergies?: string[];
    chronicConditions?: string[];
    medications?: string[];
  };
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Analytics {
  totalEmergencies: number;
  activeEmergencies: number;
  avgResponseTime: number;
  successRate: number;
  emergenciesByType: Record<EmergencyType, number>;
  emergenciesByHour: { hour: number; count: number }[];
  hotspots: { location: Location; intensity: number }[];
}
