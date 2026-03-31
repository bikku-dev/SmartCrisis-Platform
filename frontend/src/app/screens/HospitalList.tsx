import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Hospital as HospitalIcon,
  MapPin,
  Phone,
  Navigation,
  Star,
  Bed,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockHospitals } from '../data/mockData';
import type { Hospital } from '../types';

export function HospitalList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'beds' | 'rating'>('distance');
  const [filterCapacity, setFilterCapacity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredHospitals = mockHospitals
    .filter(h => 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCapacity === 'all' || h.emergencyCapacity === filterCapacity)
    )
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'beds') return b.availableBeds - a.availableBeds;
      return b.rating - a.rating;
    });

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'high': return 'bg-[#43A047] text-white';
      case 'medium': return 'bg-[#FB8C00] text-white';
      default: return 'bg-[#E53935] text-white';
    }
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
          <div>
            <h1 className="text-xl">Nearby Hospitals</h1>
            <p className="text-xs text-muted-foreground">{filteredHospitals.length} facilities found</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Search and Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-3"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="beds">Most Beds</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCapacity} onValueChange={(value: any) => setFilterCapacity(value)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Capacity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Hospital Cards */}
        <div className="space-y-4">
          {filteredHospitals.map((hospital: Hospital, index: number) => (
            <motion.div
              key={hospital.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 rounded-lg p-3">
                    <HospitalIcon className="w-8 h-8 text-secondary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg mb-1">{hospital.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{hospital.location.address}</span>
                        </div>
                      </div>
                      <Badge className={getCapacityColor(hospital.emergencyCapacity)}>
                        {hospital.emergencyCapacity}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-secondary" />
                        <span>{hospital.distance} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#43A047]" />
                        <span>{hospital.availableBeds} beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#FB8C00]" />
                        <span>{hospital.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>~{hospital.avgResponseTime} min</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        ICU: {hospital.icuBeds}
                      </Badge>
                      {hospital.specializations.slice(0, 2).map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {hospital.specializations.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hospital.specializations.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Navigation className="w-4 h-4 mr-1" />
                        Navigate
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <Card className="p-12 text-center">
            <HospitalIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hospitals found matching your criteria</p>
          </Card>
        )}
      </div>
    </div>
  );
}
