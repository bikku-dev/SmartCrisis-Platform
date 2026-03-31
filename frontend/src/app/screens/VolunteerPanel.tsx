import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
  AlertCircle,
  Activity,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { mockEmergencies, mockVolunteers } from '../data/mockData';
import type { Emergency } from '../types';

export function VolunteerPanel() {
  const navigate = useNavigate();
  const [acceptedEmergencies, setAcceptedEmergencies] = useState<string[]>([]);
  const volunteer = mockVolunteers[1]; // Current volunteer

  const handleAccept = (emergencyId: string) => {
    setAcceptedEmergencies([...acceptedEmergencies, emergencyId]);
    toast.success('Emergency accepted!', {
      description: 'Preparing route and hospital assignment...'
    });
  };

  const handleReject = (emergencyId: string) => {
    toast.info('Emergency passed to next available responder');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#E53935] text-white';
      case 'high': return 'bg-[#FB8C00] text-white';
      case 'medium': return 'bg-[#1E88E5] text-white';
      default: return 'bg-[#43A047] text-white';
    }
  };

  const calculateDistance = (emergency: Emergency) => {
    // Simplified distance calculation
    return (Math.random() * 5 + 1).toFixed(1);
  };

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
            <h1 className="text-xl">Volunteer Panel</h1>
            <p className="text-xs text-muted-foreground">Emergency response requests</p>
          </div>
          <Badge className="bg-[#43A047] text-white">
            ACTIVE
          </Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Volunteer Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 rounded-full p-4">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl">{volunteer.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {volunteer.specialization.join(' • ')}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-[#FB8C00] fill-[#FB8C00]" />
                  <span className="text-xl">{volunteer.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">{volunteer.completedEmergencies}</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div>
                <div className="text-2xl mb-1 text-[#43A047]">{acceptedEmergencies.length}</div>
                <p className="text-xs text-muted-foreground">Accepted Today</p>
              </div>
              <div>
                <div className="text-2xl mb-1 text-secondary">12</div>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Incoming Emergency Requests */}
        <div>
          <h3 className="text-lg mb-3">Incoming Requests</h3>
          <div className="space-y-4">
            {mockEmergencies
              .filter(e => e.status === 'reported' || e.status === 'dispatched')
              .map((emergency: Emergency, index: number) => (
                <motion.div
                  key={emergency.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-4 ${
                    acceptedEmergencies.includes(emergency.id) 
                      ? 'border-2 border-[#43A047]' 
                      : 'border-2 border-transparent'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(emergency.severity)}>
                          {emergency.severity}
                        </Badge>
                        <Badge variant="outline">
                          {emergency.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span>{calculateDistance(emergency)} km</span>
                      </div>
                    </div>

                    <p className="text-sm mb-3">{emergency.description}</p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {Math.floor((Date.now() - new Date(emergency.reportedAt).getTime()) / 60000)} min ago
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Risk Score: {emergency.riskScore}/100</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{emergency.location.address}</span>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-muted/50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        <span className="text-xs">AI Recommendations</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div>• ETA to scene: ~{calculateDistance(emergency)} min</div>
                        <div>• Suggested hospital: Mount Sinai (4.2 km)</div>
                        <div>• Required equipment: ALS unit, Defibrillator</div>
                      </div>
                    </div>

                    {acceptedEmergencies.includes(emergency.id) ? (
                      <div className="flex items-center justify-center gap-2 py-2 text-[#43A047]">
                        <CheckCircle className="w-5 h-5" />
                        <span>Accepted - Preparing dispatch</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => handleAccept(emergency.id)}
                          className="bg-[#43A047] hover:bg-[#43A047]/90"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleReject(emergency.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Pass
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg mb-4">This Month's Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Response Rate</span>
                  <span className="text-sm">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="text-sm">8.5 min</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
