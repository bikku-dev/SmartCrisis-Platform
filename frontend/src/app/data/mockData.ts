import type { Emergency, Hospital, User, Volunteer, Analytics, EmergencyContact } from '../types';

// Mock data for the application

export const mockUser: User = {
  id: 'user-1',
  name: 'John Anderson',
  email: 'john.anderson@email.com',
  phone: '+1 (555) 123-4567',
  role: 'user',
  location: {
    lat: 40.7580,
    lng: -73.9855,
    address: 'Times Square, New York, NY 10036'
  },
  emergencyContacts: [
    { name: 'Sarah Anderson', relationship: 'Spouse', phone: '+1 (555) 123-4568' },
    { name: 'Dr. Michael Roberts', relationship: 'Family Doctor', phone: '+1 (555) 789-0123' }
  ],
  medicalInfo: {
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension'],
    medications: ['Lisinopril 10mg']
  }
};

export const mockEmergencies: Emergency[] = [
  {
    id: 'emg-1',
    type: 'medical',
    severity: 'critical',
    status: 'en_route',
    description: 'Patient experiencing severe chest pain and shortness of breath. Possible heart attack.',
    location: {
      lat: 40.7489,
      lng: -73.9680,
      address: '350 5th Ave, New York, NY 10118'
    },
    reportedBy: 'user-1',
    reportedAt: new Date(Date.now() - 8 * 60000),
    assignedTo: 'vol-1',
    assignedHospital: 'hosp-1',
    eta: 4,
    aiConfidence: 0.92,
    riskScore: 95,
    patientDetails: {
      age: 58,
      gender: 'Male',
      vitals: {
        heartRate: 115,
        bloodPressure: '160/95',
        oxygenLevel: 89,
        temperature: 37.2
      }
    }
  },
  {
    id: 'emg-2',
    type: 'accident',
    severity: 'high',
    status: 'dispatched',
    description: 'Multi-vehicle collision on highway. Multiple injuries reported.',
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: 'Broadway & W 49th St, New York, NY 10019'
    },
    reportedBy: 'user-2',
    reportedAt: new Date(Date.now() - 5 * 60000),
    assignedTo: 'vol-2',
    eta: 7,
    aiConfidence: 0.88,
    riskScore: 82
  },
  {
    id: 'emg-3',
    type: 'fire',
    severity: 'critical',
    status: 'on_scene',
    description: 'Apartment fire on 3rd floor. Residents evacuating.',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '401 W 31st St, New York, NY 10001'
    },
    reportedBy: 'user-3',
    reportedAt: new Date(Date.now() - 15 * 60000),
    assignedTo: 'vol-3',
    assignedHospital: 'hosp-2',
    eta: 0,
    aiConfidence: 0.95,
    riskScore: 93
  }
];

export const mockHospitals: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Mount Sinai Medical Center',
    location: {
      lat: 40.7899,
      lng: -73.9524,
      address: '1 Gustave L. Levy Pl, New York, NY 10029'
    },
    distance: 4.2,
    availableBeds: 23,
    icuBeds: 5,
    emergencyCapacity: 'high',
    specializations: ['Cardiology', 'Trauma', 'Neurology', 'Emergency Medicine'],
    contactNumber: '+1 (555) 234-5678',
    avgResponseTime: 12,
    rating: 4.8
  },
  {
    id: 'hosp-2',
    name: 'NYU Langone Health',
    location: {
      lat: 40.7424,
      lng: -73.9738,
      address: '550 1st Ave, New York, NY 10016'
    },
    distance: 2.8,
    availableBeds: 18,
    icuBeds: 3,
    emergencyCapacity: 'medium',
    specializations: ['Orthopedics', 'Burn Treatment', 'Pediatrics'],
    contactNumber: '+1 (555) 345-6789',
    avgResponseTime: 8,
    rating: 4.6
  },
  {
    id: 'hosp-3',
    name: 'Bellevue Hospital',
    location: {
      lat: 40.7390,
      lng: -73.9751,
      address: '462 1st Ave, New York, NY 10016'
    },
    distance: 3.1,
    availableBeds: 31,
    icuBeds: 8,
    emergencyCapacity: 'high',
    specializations: ['Trauma', 'Emergency Medicine', 'Surgery', 'Critical Care'],
    contactNumber: '+1 (555) 456-7890',
    avgResponseTime: 10,
    rating: 4.7
  },
  {
    id: 'hosp-4',
    name: 'NewYork-Presbyterian',
    location: {
      lat: 40.7654,
      lng: -73.9547,
      address: '525 E 68th St, New York, NY 10065'
    },
    distance: 5.5,
    availableBeds: 12,
    icuBeds: 2,
    emergencyCapacity: 'low',
    specializations: ['Cardiology', 'Oncology', 'Internal Medicine'],
    contactNumber: '+1 (555) 567-8901',
    avgResponseTime: 15,
    rating: 4.9
  }
];

export const mockVolunteers: Volunteer[] = [
  {
    id: 'vol-1',
    name: 'Dr. Emily Chen',
    location: {
      lat: 40.7500,
      lng: -73.9700,
      address: 'Chelsea, New York, NY'
    },
    status: 'busy',
    specialization: ['Cardiology', 'Emergency Medicine'],
    rating: 4.9,
    completedEmergencies: 156
  },
  {
    id: 'vol-2',
    name: 'Paramedic James Wilson',
    location: {
      lat: 40.7600,
      lng: -73.9800,
      address: 'Midtown, New York, NY'
    },
    status: 'available',
    specialization: ['Trauma', 'Critical Care'],
    rating: 4.7,
    completedEmergencies: 203
  },
  {
    id: 'vol-3',
    name: 'EMT Sarah Martinez',
    location: {
      lat: 40.7450,
      lng: -73.9900,
      address: 'Hell\'s Kitchen, New York, NY'
    },
    status: 'busy',
    specialization: ['Fire Rescue', 'First Aid'],
    rating: 4.8,
    completedEmergencies: 178
  }
];

export const mockAnalytics: Analytics = {
  totalEmergencies: 1247,
  activeEmergencies: 8,
  avgResponseTime: 9.5,
  successRate: 94.7,
  emergenciesByType: {
    medical: 542,
    accident: 318,
    fire: 127,
    violence: 89,
    natural_disaster: 23,
    other: 148
  },
  emergenciesByHour: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: Math.floor(Math.random() * 50) + 10
  })),
  hotspots: [
    { location: { lat: 40.7489, lng: -73.9680, address: 'Empire State Building Area' }, intensity: 85 },
    { location: { lat: 40.7580, lng: -73.9855, address: 'Times Square Area' }, intensity: 92 },
    { location: { lat: 40.7614, lng: -73.9776, address: 'Theater District' }, intensity: 78 }
  ]
};

// Mock emergency history for user
export const mockEmergencyHistory: Emergency[] = [
  {
    id: 'emg-hist-1',
    type: 'medical',
    severity: 'medium',
    status: 'resolved',
    description: 'Minor injury from fall',
    location: mockUser.location!,
    reportedBy: 'user-1',
    reportedAt: new Date('2026-03-15T14:30:00'),
    assignedHospital: 'hosp-2',
    aiConfidence: 0.82,
    riskScore: 45
  },
  {
    id: 'emg-hist-2',
    type: 'accident',
    severity: 'low',
    status: 'resolved',
    description: 'Minor vehicle collision',
    location: {
      lat: 40.7550,
      lng: -73.9850,
      address: '8th Ave & W 44th St, New York, NY'
    },
    reportedBy: 'user-1',
    reportedAt: new Date('2026-02-28T09:15:00'),
    assignedHospital: 'hosp-3',
    aiConfidence: 0.79,
    riskScore: 38
  }
];

// Protocol guides
export const emergencyProtocols = {
  medical: {
    'heart_attack': [
      'Call emergency services immediately',
      'Have patient sit or lie down comfortably',
      'Give aspirin if available and not allergic',
      'Loosen tight clothing',
      'Monitor breathing and pulse',
      'Be prepared to perform CPR'
    ],
    'stroke': [
      'Call emergency services - time is critical',
      'Note the time symptoms started',
      'Keep patient calm and lying down',
      'Do not give food or drink',
      'Monitor airway and breathing',
      'Check for FAST symptoms (Face, Arms, Speech, Time)'
    ],
    'choking': [
      'Ask if person can speak or cough',
      'Perform Heimlich maneuver if needed',
      'Call emergency if obstruction persists',
      'Do not perform blind finger sweeps',
      'Be prepared for unconsciousness'
    ]
  },
  fire: {
    'building_fire': [
      'Activate fire alarm',
      'Evacuate immediately - do not use elevators',
      'Close doors behind you',
      'Stay low if there is smoke',
      'Call 911 once safe',
      'Do not re-enter building'
    ]
  },
  accident: {
    'vehicle_collision': [
      'Ensure scene safety',
      'Call emergency services',
      'Do not move injured unless danger present',
      'Control bleeding with direct pressure',
      'Keep victims warm',
      'Wait for professional help'
    ]
  }
};
