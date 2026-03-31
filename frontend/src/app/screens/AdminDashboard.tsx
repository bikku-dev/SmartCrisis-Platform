import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  Ambulance,
  Hospital,
  AlertCircle,
  MapPin,
  BarChart3,
  PieChart,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { mockAnalytics, mockEmergencies, mockHospitals } from '../data/mockData';

export function AdminDashboard() {
  const navigate = useNavigate();

  const COLORS = ['#E53935', '#1E88E5', '#43A047', '#FB8C00', '#9C27B0', '#757575'];

  const emergencyTypeData = Object.entries(mockAnalytics.emergenciesByType).map(([type, count]) => ({
    name: type.replace('_', ' '),
    value: count
  }));

  const hourlyData = mockAnalytics.emergenciesByHour.filter(d => d.hour >= 6 && d.hour <= 22);

  const responseTimeData = [
    { month: 'Jan', time: 11.2 },
    { month: 'Feb', time: 10.8 },
    { month: 'Mar', time: 9.5 },
    { month: 'Apr', time: 10.1 },
    { month: 'May', time: 9.8 },
    { month: 'Jun', time: 9.2 }
  ];

  const hospitalCapacityData = mockHospitals.map(h => ({
    name: h.name.split(' ')[0],
    available: h.availableBeds,
    icu: h.icuBeds
  }));

  const kpiCards = [
    {
      title: 'Total Emergencies',
      value: mockAnalytics.totalEmergencies.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Activity,
      color: 'text-primary'
    },
    {
      title: 'Active Cases',
      value: mockAnalytics.activeEmergencies.toString(),
      change: '-2',
      trend: 'down',
      icon: AlertCircle,
      color: 'text-[#FB8C00]'
    },
    {
      title: 'Avg Response Time',
      value: `${mockAnalytics.avgResponseTime} min`,
      change: '-8.2%',
      trend: 'down',
      icon: Clock,
      color: 'text-secondary'
    },
    {
      title: 'Success Rate',
      value: `${mockAnalytics.successRate}%`,
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-[#43A047]'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">System Analytics & Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                  <Badge
                    variant={kpi.trend === 'up' ? 'default' : 'secondary'}
                    className={kpi.trend === 'up' ? 'bg-[#43A047]' : 'bg-muted'}
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <div className="text-3xl mb-1">{kpi.value}</div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Emergency Types Distribution */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Emergency Types Distribution
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={emergencyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emergencyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Hourly Emergency Trend */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                    Emergencies by Hour
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#1E88E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>

              {/* Response Time Trend */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#43A047]" />
                    Response Time Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="time" stroke="#43A047" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="emergencies" className="space-y-6 mt-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className="p-6">
                <h3 className="text-lg mb-4">Active Emergencies</h3>
                <div className="space-y-3">
                  {mockEmergencies.map((emergency) => (
                    <div key={emergency.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge className="bg-[#E53935] text-white mb-2">
                            {emergency.severity}
                          </Badge>
                          <p className="text-sm mb-1">{emergency.description}</p>
                        </div>
                        <Badge variant="outline">{emergency.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Risk: {emergency.riskScore}/100</span>
                        <span>AI: {Math.round(emergency.aiConfidence * 100)}%</span>
                        {emergency.eta && <span>ETA: {emergency.eta} min</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-secondary" />
                  Hospital Bed Capacity
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hospitalCapacityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="available" fill="#1E88E5" name="Available Beds" />
                    <Bar dataKey="icu" fill="#E53935" name="ICU Beds" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Ambulance className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl">24</p>
                    <p className="text-xs text-muted-foreground">Active Ambulances</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="text-2xl">156</p>
                    <p className="text-xs text-muted-foreground">Available Volunteers</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Hospital className="w-8 h-8 text-[#43A047]" />
                  <div>
                    <p className="text-2xl">12</p>
                    <p className="text-xs text-muted-foreground">Partner Hospitals</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6 mt-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FB8C00]" />
                  Predicted Emergency Hotspots
                </h3>
                <div className="space-y-3">
                  {mockAnalytics.hotspots.map((hotspot, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{hotspot.location.address}</span>
                        <Badge variant="destructive">
                          Intensity: {hotspot.intensity}%
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-[#E53935] h-2 rounded-full transition-all"
                          style={{ width: `${hotspot.intensity}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <Card className="p-6">
              <h3 className="text-lg mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm mb-2">
                    <span className="font-medium">Resource Allocation:</span> Increase ambulance coverage in Times Square area by 2 units during evening hours
                  </p>
                  <p className="text-xs text-muted-foreground">Confidence: 87%</p>
                </div>
                <div className="p-4 bg-[#43A047]/10 rounded-lg">
                  <p className="text-sm mb-2">
                    <span className="font-medium">Capacity Planning:</span> Mount Sinai ICU capacity trending low - coordinate with nearby facilities
                  </p>
                  <p className="text-xs text-muted-foreground">Confidence: 92%</p>
                </div>
                <div className="p-4 bg-[#FB8C00]/10 rounded-lg">
                  <p className="text-sm mb-2">
                    <span className="font-medium">Training Need:</span> Increase trauma response training for Zone A volunteers
                  </p>
                  <p className="text-xs text-muted-foreground">Confidence: 78%</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
