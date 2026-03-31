import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Flame,
  Car,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { emergencyProtocols } from '../data/mockData';

export function ProtocolGuide() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);

  const categories = [
    {
      id: 'medical',
      name: 'Medical Emergencies',
      icon: Heart,
      color: 'text-[#E53935]',
      bgColor: 'bg-[#E53935]/10',
      protocols: emergencyProtocols.medical
    },
    {
      id: 'fire',
      name: 'Fire Emergencies',
      icon: Flame,
      color: 'text-[#FB8C00]',
      bgColor: 'bg-[#FB8C00]/10',
      protocols: emergencyProtocols.fire
    },
    {
      id: 'accident',
      name: 'Accident Response',
      icon: Car,
      color: 'text-[#1E88E5]',
      bgColor: 'bg-[#1E88E5]/10',
      protocols: emergencyProtocols.accident
    }
  ];

  const filteredCategories = categories.map(cat => ({
    ...cat,
    protocols: Object.fromEntries(
      Object.entries(cat.protocols).filter(([key]) =>
        key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  })).filter(cat => Object.keys(cat.protocols).length > 0);

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
          <div>
            <h1 className="text-xl">Emergency Protocols</h1>
            <p className="text-xs text-muted-foreground">Step-by-step response guides</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Alert Banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="p-4 bg-[#FB8C00]/10 border-[#FB8C00]/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#FB8C00] mt-0.5" />
              <div>
                <p className="text-sm mb-1">
                  <span className="font-medium">Important:</span> These guides are for reference only
                </p>
                <p className="text-xs text-muted-foreground">
                  Always call emergency services (911) immediately in life-threatening situations
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            placeholder="Search protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </motion.div>

        {/* Protocol Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
            >
              <Card>
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${category.bgColor} rounded-lg p-3`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {Object.keys(category.protocols).length} protocols
                      </p>
                    </div>
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {expandedCategory === category.id && (
                  <div className="p-4 pt-0 space-y-3">
                    {Object.entries(category.protocols).map(([protocolKey, steps]) => (
                      <div key={protocolKey} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedProtocol(
                            expandedProtocol === protocolKey ? null : protocolKey
                          )}
                          className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm capitalize">
                              {protocolKey.replace('_', ' ')}
                            </span>
                          </div>
                          {expandedProtocol === protocolKey ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>

                        {expandedProtocol === protocolKey && (
                          <div className="p-4 pt-0 bg-muted/30">
                            <ol className="space-y-2">
                              {(steps as string[]).map((step, index) => (
                                <li key={index} className="flex gap-3">
                                  <Badge
                                    variant="outline"
                                    className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full"
                                  >
                                    {index + 1}
                                  </Badge>
                                  <span className="text-sm pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No protocols found matching your search</p>
          </Card>
        )}

        {/* Quick Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-secondary/5">
            <h3 className="text-lg mb-4">General Emergency Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Stay calm and assess the situation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Ensure scene safety before approaching</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Call emergency services immediately in critical situations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Provide clear location and situation details to dispatchers</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Follow dispatcher instructions until help arrives</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* Emergency Numbers */}
        <Card className="p-6">
          <h3 className="text-lg mb-4">Emergency Contact Numbers</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3 bg-[#E53935]/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Emergency Services</p>
              <p className="text-2xl text-[#E53935]">911</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Poison Control</p>
              <p className="text-xl text-secondary">1-800-222-1222</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
