import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Clock,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
  Bell
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { mockUser, mockEmergencyHistory } from '../data/mockData';
import type { Emergency } from '../types';

export function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Settings, label: 'Account Settings', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: Heart, label: 'Medical Information', action: () => {} }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#E53935]';
      case 'high': return 'bg-[#FB8C00]';
      case 'medium': return 'bg-[#1E88E5]';
      default: return 'bg-[#43A047]';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/80 text-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">Profile</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 -mt-8 space-y-6 pb-6">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 rounded-full p-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-1">{mockUser.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{mockUser.role}</Badge>
                  <Badge className="bg-[#43A047] text-white">Verified</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>{mockUser.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>{mockUser.phone}</span>
              </div>
              {mockUser.location && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1">{mockUser.location.address}</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Medical Information */}
        {mockUser.medicalInfo && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Medical Information
                </h3>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Blood Type</p>
                  <p className="text-sm">{mockUser.medicalInfo.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Allergies</p>
                  <p className="text-sm">{mockUser.medicalInfo.allergies?.join(', ') || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Chronic Conditions</p>
                  <p className="text-sm">{mockUser.medicalInfo.chronicConditions?.join(', ') || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Medications</p>
                  <p className="text-sm">{mockUser.medicalInfo.medications?.join(', ') || 'None'}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Emergency Contacts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Emergency Contacts</h3>
              <Button variant="ghost" size="sm">Add</Button>
            </div>
            <div className="space-y-3">
              {mockUser.emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm mb-1">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Emergency History */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg mb-4">Emergency History</h3>
            <div className="space-y-3">
              {mockEmergencyHistory.map((emergency: Emergency) => (
                <div
                  key={emergency.id}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(emergency.severity)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {emergency.type.replace('_', ' ')}
                      </Badge>
                      <Badge className="bg-[#43A047] text-white text-xs">
                        Resolved
                      </Badge>
                    </div>
                    <p className="text-sm mb-1">{emergency.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(emergency.reportedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Settings Menu */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                <button
                  onClick={item.action}
                  className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </Card>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1">Location Services</p>
                  <p className="text-xs text-muted-foreground">Allow emergency tracking</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1">Emergency Alerts</p>
                  <p className="text-xs text-muted-foreground">Receive nearby emergency notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1">Share Medical Info</p>
                  <p className="text-xs text-muted-foreground">Auto-share with responders</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-[#E53935] border-[#E53935] hover:bg-[#E53935] hover:text-white"
          onClick={() => navigate('/login')}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
