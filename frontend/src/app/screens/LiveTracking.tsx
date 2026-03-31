import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Activity,
  CheckCircle,
  AlertCircle,
  User,
  Ambulance,
  Hospital
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { mockEmergencies, mockHospitals, mockVolunteers } from '../data/mockData';

export function LiveTracking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eta, setEta] = useState(4);
  const [progress, setProgress] = useState(30);

  const emergency = mockEmergencies.find(e => e.id === id) || mockEmergencies[0];
  const hospital = mockHospitals.find(h => h.id === emergency.assignedHospital);
  const volunteer = mockVolunteers.find(v => v.id === emergency.assignedTo);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
      setProgress(prev => Math.min(100, prev + 5));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const statusSteps = [
    { label: 'Reported', status: 'complete', icon: AlertCircle },
    { label: 'Dispatched', status: emergency.status === 'reported' ? 'pending' : 'complete', icon: Activity },
    { label: 'En Route', status: ['en_route', 'on_scene'].includes(emergency.status) ? 'active' : 'pending', icon: Ambulance },
    { label: 'On Scene', status: emergency.status === 'on_scene' ? 'complete' : 'pending', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl">Live Tracking</h1>
            <p className="text-xs text-muted-foreground">Emergency #{emergency.id}</p>
          </div>
          <Badge variant="destructive" className="animate-pulse">
            ACTIVE
          </Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* ETA Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="inline-block bg-primary/10 rounded-full p-4 mb-4">
              <Ambulance className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl mb-2">{eta} min</h2>
            <p className="text-muted-foreground mb-4">Estimated Time of Arrival</p>
            <Progress value={progress} className="h-3 mb-2" />
            <p className="text-xs text-muted-foreground">{progress}% Complete</p>
          </Card>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg mb-4">Response Status</h3>
            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'complete' ? 'bg-[#43A047] text-white' :
                    step.status === 'active' ? 'bg-primary text-white animate-pulse' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{step.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {step.status === 'complete' ? 'Completed' : 
                       step.status === 'active' ? 'In Progress' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Map View */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-secondary/20 to-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-2 animate-bounce" />
                  <p className="text-sm">Real-time map tracking</p>
                  <p className="text-xs text-muted-foreground">Ambulance location updating</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-muted/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-secondary" />
                  <span>Distance: 2.3 km</span>
                </div>
                <Button variant="link" size="sm">
                  Open in Maps
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Assigned Hospital */}
        {hospital && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 rounded-lg p-3">
                  <Hospital className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">{hospital.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{hospital.location.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[#43A047]">
                      {hospital.availableBeds} beds available
                    </span>
                    <span className="text-secondary">
                      {hospital.icuBeds} ICU beds
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Responder Info */}
        {volunteer && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg">Assigned Responder</h3>
                <Badge variant="outline" className="text-[#43A047]">
                  ⭐ {volunteer.rating}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{volunteer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {volunteer.specialization.join(', ')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {volunteer.completedEmergencies} emergencies completed
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="default" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Emergency Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4">
            <h3 className="text-lg mb-3">Emergency Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Type & Severity</p>
                <div className="flex gap-2">
                  <Badge variant="outline">{emergency.type.replace('_', ' ')}</Badge>
                  <Badge className="bg-[#E53935] text-white">{emergency.severity}</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{emergency.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reported At</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(emergency.reportedAt).toLocaleString()}</span>
                </div>
              </div>
              {emergency.patientDetails?.vitals && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Patient Vitals</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/50 rounded p-2">
                      <span className="text-muted-foreground">Heart Rate:</span>{' '}
                      <span>{emergency.patientDetails.vitals.heartRate} bpm</span>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <span className="text-muted-foreground">BP:</span>{' '}
                      <span>{emergency.patientDetails.vitals.bloodPressure}</span>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <span className="text-muted-foreground">O2:</span>{' '}
                      <span>{emergency.patientDetails.vitals.oxygenLevel}%</span>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <span className="text-muted-foreground">Temp:</span>{' '}
                      <span>{emergency.patientDetails.vitals.temperature}°C</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
