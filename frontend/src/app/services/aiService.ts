import type { Emergency, EmergencyType, EmergencySeverity } from '../types';

// AI-powered emergency classification service
export class AITriageService {
  // Simulates AI classification based on keywords in description
  static classifyEmergency(description: string): {
    type: EmergencyType;
    severity: EmergencySeverity;
    confidence: number;
    keywords: string[];
    riskScore: number;
  } {
    const lowerDesc = description.toLowerCase();
    
    // Emergency type classification
    let type: EmergencyType = 'other';
    let severity: EmergencySeverity = 'medium';
    let confidence = 0.7;
    const keywords: string[] = [];
    let riskScore = 50;

    // Medical emergencies
    const medicalKeywords = ['heart attack', 'stroke', 'bleeding', 'unconscious', 'breathing', 'chest pain', 'cardiac', 'seizure', 'diabetic', 'poison'];
    const criticalMedical = ['heart attack', 'stroke', 'unconscious', 'severe bleeding', 'not breathing', 'cardiac arrest'];
    
    // Fire emergencies
    const fireKeywords = ['fire', 'smoke', 'burning', 'explosion', 'gas leak'];
    
    // Accident keywords
    const accidentKeywords = ['accident', 'crash', 'collision', 'injured', 'vehicle', 'motorcycle'];
    
    // Violence keywords
    const violenceKeywords = ['assault', 'attack', 'shooting', 'stabbing', 'violence', 'weapon'];
    
    // Natural disaster keywords
    const disasterKeywords = ['earthquake', 'flood', 'hurricane', 'tornado', 'tsunami'];

    // Classify by type
    if (medicalKeywords.some(kw => lowerDesc.includes(kw))) {
      type = 'medical';
      keywords.push(...medicalKeywords.filter(kw => lowerDesc.includes(kw)));
      confidence = 0.85;
      
      if (criticalMedical.some(kw => lowerDesc.includes(kw))) {
        severity = 'critical';
        riskScore = 95;
      } else if (lowerDesc.includes('severe') || lowerDesc.includes('emergency')) {
        severity = 'high';
        riskScore = 80;
      } else {
        severity = 'medium';
        riskScore = 60;
      }
    } else if (fireKeywords.some(kw => lowerDesc.includes(kw))) {
      type = 'fire';
      keywords.push(...fireKeywords.filter(kw => lowerDesc.includes(kw)));
      severity = 'critical';
      confidence = 0.9;
      riskScore = 90;
    } else if (violenceKeywords.some(kw => lowerDesc.includes(kw))) {
      type = 'violence';
      keywords.push(...violenceKeywords.filter(kw => lowerDesc.includes(kw)));
      severity = 'high';
      confidence = 0.88;
      riskScore = 85;
    } else if (accidentKeywords.some(kw => lowerDesc.includes(kw))) {
      type = 'accident';
      keywords.push(...accidentKeywords.filter(kw => lowerDesc.includes(kw)));
      severity = lowerDesc.includes('severe') ? 'high' : 'medium';
      confidence = 0.82;
      riskScore = severity === 'high' ? 75 : 65;
    } else if (disasterKeywords.some(kw => lowerDesc.includes(kw))) {
      type = 'natural_disaster';
      keywords.push(...disasterKeywords.filter(kw => lowerDesc.includes(kw)));
      severity = 'critical';
      confidence = 0.92;
      riskScore = 92;
    }

    return { type, severity, confidence, keywords, riskScore };
  }

  // Priority scoring algorithm
  static calculatePriority(emergency: Emergency): number {
    let score = 0;
    
    // Severity weight (40%)
    const severityScores = { critical: 40, high: 30, medium: 20, low: 10 };
    score += severityScores[emergency.severity];
    
    // Risk score weight (30%)
    score += (emergency.riskScore / 100) * 30;
    
    // Time elapsed weight (20%)
    const minutesElapsed = (Date.now() - new Date(emergency.reportedAt).getTime()) / (1000 * 60);
    score += Math.min(minutesElapsed / 30 * 20, 20);
    
    // AI confidence weight (10%)
    score += emergency.aiConfidence * 10;
    
    return Math.min(Math.round(score), 100);
  }

  // Predict resource requirements
  static predictResourceNeeds(emergency: Emergency): {
    ambulanceType: string;
    additionalResources: string[];
    estimatedPersonnel: number;
  } {
    let ambulanceType = 'Basic Life Support (BLS)';
    const additionalResources: string[] = [];
    let estimatedPersonnel = 2;

    if (emergency.severity === 'critical') {
      ambulanceType = 'Advanced Life Support (ALS)';
      estimatedPersonnel = 4;
      additionalResources.push('Paramedic', 'Emergency Physician');
    }

    if (emergency.type === 'fire') {
      additionalResources.push('Fire Department', 'Hazmat Team');
      estimatedPersonnel = 6;
    }

    if (emergency.type === 'accident') {
      additionalResources.push('Rescue Team', 'Police');
      estimatedPersonnel = 5;
    }

    if (emergency.riskScore > 85) {
      additionalResources.push('Trauma Surgeon', 'Blood Bank Alert');
    }

    return { ambulanceType, additionalResources, estimatedPersonnel };
  }
}

// Location and routing service
export class LocationService {
  static calculateDistance(loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }): number {
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  static calculateETA(distance: number, trafficFactor: number = 1.2): number {
    // Average emergency vehicle speed: 60 km/h
    const avgSpeed = 60;
    return Math.round((distance / avgSpeed) * trafficFactor * 60); // in minutes
  }
}

// Voice recognition simulation
export class VoiceService {
  static transcribeAudio(): Promise<string> {
    // Simulated voice transcription
    return new Promise((resolve) => {
      setTimeout(() => {
        const samples = [
          "Patient having chest pain and difficulty breathing",
          "Car accident on Highway 101, multiple injuries",
          "Fire in apartment building, people trapped",
          "Elderly person fell and cannot get up",
          "Child having severe allergic reaction"
        ];
        resolve(samples[Math.floor(Math.random() * samples.length)]);
      }, 2000);
    });
  }
}

// Predictive analytics service
export class PredictiveAnalytics {
  static predictEmergencyHotspots(historicalData: Emergency[]): Array<{
    location: { lat: number; lng: number };
    predictedIncidents: number;
    timeWindow: string;
    confidence: number;
  }> {
    // Simplified hotspot prediction
    return [
      {
        location: { lat: 40.7489, lng: -73.9680 },
        predictedIncidents: 8,
        timeWindow: 'Next 4 hours',
        confidence: 0.78
      },
      {
        location: { lat: 40.7580, lng: -73.9855 },
        predictedIncidents: 5,
        timeWindow: 'Next 4 hours',
        confidence: 0.72
      }
    ];
  }

  static optimizeResourceAllocation(emergencies: Emergency[]): {
    recommendation: string;
    redistribution: Array<{ from: string; to: string; units: number }>;
  } {
    return {
      recommendation: 'Increase ambulance coverage in Zone A by 2 units',
      redistribution: [
        { from: 'Zone C', to: 'Zone A', units: 2 },
        { from: 'Zone B', to: 'Zone D', units: 1 }
      ]
    };
  }
}
