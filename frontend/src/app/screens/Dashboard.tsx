import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  AlertCircle,
  Ambulance,
  MapPin,
  Phone,
  User,
  Activity,
  Hospital,
  Shield,
  Clock,
  Navigation,
  Droplet,
  FileText,
  Bell,
  Menu,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockEmergencies, mockUser } from '../data/mockData';
import type { Emergency } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const [isOffline] = useState(false);
  const recentEmergencies = mockEmergencies.slice(0, 3);

  const quickActions = [
    {
      icon: Ambulance,
      label: 'Call Ambulance',
      color: 'bg-primary',
      action: () => navigate('/emergency/new')
    },
    {
      icon: Hospital,
      label: 'Find Hospital',
      color: 'bg-secondary',
      action: () => navigate('/hospitals')
    },
    {
      icon: Droplet,
      label: 'Blood Request',
      color: 'bg-[#E53935]',
      action: () => navigate('/emergency/new')
    },
    {
      icon: FileText,
      label: 'Protocols',
      color: 'bg-[#43A047]',
      action: () => navigate('/protocols')
    }
  ];

  const emergencyStats = [
    { label: 'Avg Response', value: '9.5 min', icon: Clock, color: 'text-secondary' },
    { label: 'Active Cases', value: '8', icon: Activity, color: 'text-[#FB8C00]' },
    { label: 'Nearby Units', value: '12', icon: Shield, color: 'text-[#43A047]' }
  ];

  const handleSOSClick = () => {
    navigate('/emergency/new');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#E53935] text-white';
      case 'high': return 'bg-[#FB8C00] text-white';
      case 'medium': return 'bg-[#1E88E5] text-white';
      default: return 'bg-[#43A047] text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route': return 'text-[#1E88E5]';
      case 'dispatched': return 'text-[#FB8C00]';
      case 'on_scene': return 'text-[#43A047]';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-full p-2">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl text-foreground">CrisisAI</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Emergency Response</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isOffline ? 'bg-red-50' : 'bg-green-50'}`}>
              {isOffline ? (
                <WifiOff className="w-4 h-4 text-red-600" />
              ) : (
                <Wifi className="w-4 h-4 text-green-600" />
              )}
              <span className={`text-xs ${isOffline ? 'text-red-600' : 'text-green-600'}`}>
                {isOffline ? 'Offline Mode' : 'Online'}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-2xl mb-1">Welcome back, {mockUser.name.split(' ')[0]}</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{mockUser.location?.address}</span>
          </div>
        </motion.div>

        {/* Emergency Stats */}
        <div className="grid grid-cols-3 gap-3">
          {emergencyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* SOS Emergency Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center py-6"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSOSClick}
            className="relative group"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-primary rounded-full blur-xl"
            />
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full p-12 shadow-2xl border-4 border-white group-hover:border-primary/20 transition-all">
              <AlertCircle className="w-24 h-24 text-white" strokeWidth={2.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl mt-32">SOS</span>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-sm text-muted-foreground">Tap for Emergency</p>
            </div>
          </motion.button>
        </motion.div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={action.action}
                >
                  <div className={`${action.color} rounded-xl p-3 inline-block mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm">{action.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Map Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg">Nearby Emergency Services</h3>
            <Button variant="ghost" size="sm">
              <Navigation className="w-4 h-4 mr-1" />
              View Map
            </Button>
          </div>
          <Card className="relative h-48 bg-muted overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive map view</p>
                <p className="text-xs text-muted-foreground">12 emergency units nearby</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Emergencies */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg">Active Emergencies</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/volunteer')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentEmergencies.map((emergency: Emergency, index: number) => (
              <motion.div
                key={emergency.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(emergency.severity)}>
                        {emergency.severity}
                      </Badge>
                      <Badge variant="outline">
                        {emergency.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    {emergency.eta && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>ETA: {emergency.eta} min</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mb-2 line-clamp-2">{emergency.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{emergency.location.address}</span>
                    </div>
                    <span className={`text-xs flex items-center gap-1 ${getStatusColor(emergency.status)}`}>
                      <Activity className="w-3 h-3" />
                      {emergency.status.replace('_', ' ')}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border lg:hidden z-50">
        <div className="grid grid-cols-5 gap-1">
          {[
            { icon: Activity, label: 'Dashboard', path: '/dashboard' },
            { icon: Hospital, label: 'Hospitals', path: '/hospitals' },
            { icon: AlertCircle, label: 'SOS', path: '/emergency/new', primary: true },
            { icon: Phone, label: 'Volunteer', path: '/volunteer' },
            { icon: User, label: 'Profile', path: '/profile' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`py-3 flex flex-col items-center gap-1 ${
                item.primary ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className={item.primary ? 'w-6 h-6' : 'w-5 h-5'} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
