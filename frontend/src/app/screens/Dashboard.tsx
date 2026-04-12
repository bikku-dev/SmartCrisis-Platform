import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  AlertCircle,
  Ambulance,
  MapPin,
  User,
  Activity,
  Hospital,
  Shield,
  Clock,
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
import API from '../api/api';

export function Dashboard() {
  const navigate = useNavigate();
  const [isOffline] = useState(false);

  // ✅ STATES
  const [user, setUser] = useState<any>(null);
  const [emergencies, setEmergencies] = useState<any[]>([]);

  // ✅ TOKEN EXCHANGE
  const exchangeToken = async (code: string) => {
    try {
      console.log("CODE:", code);

      const res = await fetch("http://localhost:8082/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code,
          code_verifier: localStorage.getItem("pkce_verifier")
        })
      });

      const data = await res.json();

      if (!data.access_token) {
        throw new Error("Token not received");
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      console.log("✅ TOKEN SAVED:", data);

      return true;
    } catch (error) {
      console.error("Token Exchange Error:", error);
      return false;
    }
  };

  // ✅ INITIAL FLOW (FIXED)
  useEffect(() => {
    const initAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const success = await exchangeToken(code);

        if (success) {
          // ✅ CLEAN URL
          window.history.replaceState({}, document.title, "/dashboard");

          // ✅ FETCH AFTER TOKEN
          fetchData();
        }
      } else {
        // already logged in
        fetchData();
      }
    };

    initAuth();
  }, []);

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const userRes = await API.get("/users/me");
      setUser(userRes.data);

      const emergencyRes = await API.get("/emergencies/active");
      console.log(emergencyRes);
      
      setEmergencies(emergencyRes.data.slice(0, 3));

    } catch (err) {
      console.error("API Error:", err);
    }
  };

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
    { label: 'Active Cases', value: emergencies.length.toString(), icon: Activity, color: 'text-[#FB8C00]' },
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
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Emergency Response
                </p>
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

            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Welcome */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 className="text-2xl mb-1">
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}
          </h2>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {user?.location?.address || 'No location'}
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {emergencyStats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
              <Card className="p-4 text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* SOS */}
        <motion.div className="flex justify-center py-6">
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSOSClick}>
            <div className="bg-primary rounded-full p-12 shadow-2xl">
              <AlertCircle className="w-24 h-24 text-white" />
            </div>
          </motion.button>
        </motion.div>

        {/* Actions */}
        <div>
          <h3 className="text-lg mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Card key={action.label} className="p-4 cursor-pointer" onClick={action.action}>
                <div className={`${action.color} rounded-xl p-3 inline-block mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm">{action.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergencies */}
        <div>
          <h3 className="text-lg mb-3">Active Emergencies</h3>
          
          {emergencies.map((emergency: any) => (
            <Card key={emergency.id} className="p-4 mb-2">
              <Badge className={getSeverityColor(emergency.severity)}>
                {emergency.severity}
              </Badge>
              <p>{emergency.description}</p>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}