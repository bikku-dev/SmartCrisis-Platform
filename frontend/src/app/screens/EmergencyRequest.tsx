import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Mic,
  Send,
  Loader2,
  AlertCircle,
  Brain,
  CheckCircle,
  MapPin,
  Phone,
  User as UserIcon,
  Heart
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { AITriageService, VoiceService } from '../services/aiService';
import { mockUser } from '../data/mockData';
import type { EmergencyType, EmergencySeverity } from '../types';
import API from '../api/api';
export function EmergencyRequest() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState<{
    type: EmergencyType;
    severity: EmergencySeverity;
    confidence: number;
    keywords: string[];
    riskScore: number;
  } | null>(null);

  const handleVoiceInput = async () => {
    setIsRecording(true);
    toast.info('Listening... Speak now');

    try {
      const transcription = await VoiceService.transcribeAudio();
      setDescription(transcription);
      toast.success('Voice recorded successfully');

      // Auto-analyze after voice input
      handleAnalyze(transcription);
    } catch (error) {
      toast.error('Voice recording failed');
    } finally {
      setIsRecording(false);
    }
  };

  const handleAnalyze = (text?: string) => {
    const textToAnalyze = text || description;

    if (!textToAnalyze.trim()) {
      toast.error('Please describe the emergency');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const result = AITriageService.classifyEmergency(textToAnalyze);
      setAiResult(result);
      setIsAnalyzing(false);

      toast.success('AI analysis complete', {
        description: `Detected: ${result.type.replace('_', ' ')} - ${result.severity} severity`
      });
    }, 2000);
  };

 const handleSubmit = async () => {
  if (!description.trim()) {
    toast.error('Please describe the emergency');
    return;
  }

  if (!aiResult) {
    toast.warning('Running AI analysis first...');
    handleAnalyze();
    return;
  }

  try {
    setIsSubmitting(true);

    const payload = {
      description,
      type: aiResult.type.toUpperCase(),        // 🔥 ENUM FIX
      severity: aiResult.severity.toUpperCase(),// 🔥 ENUM FIX
      latitude: 28.6139,
      longitude: 77.2090,
      address: mockUser.location?.address || "Unknown",
      patientName,
      age: age ? Number(age) : 0,
      contactNumber,
      medicalConditions
    };

    console.log("PAYLOAD:", payload);

    const res = await API.post("/emergencies", payload);

    toast.success('Emergency request submitted!');

    navigate(`/emergency/${res.data.id}/tracking`);

  } catch (err: any) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Submission failed");
  } finally {
    setIsSubmitting(false);
  }
};

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#E53935] text-white';
      case 'high': return 'bg-[#FB8C00] text-white';
      case 'medium': return 'bg-[#1E88E5] text-white';
      default: return 'bg-[#43A047] text-white';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-[#E53935]';
    if (score >= 60) return 'text-[#FB8C00]';
    if (score >= 40) return 'text-[#1E88E5]';
    return 'text-[#43A047]';
  };

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-xl">Emergency Request</h1>
            <p className="text-xs text-muted-foreground">AI-powered emergency classification</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* User Location Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm mb-1">Your Current Location</p>
                <p className="text-xs text-muted-foreground">{mockUser.location?.address}</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </Card>
        </motion.div>

        {/* Emergency Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <Label htmlFor="description" className="mb-3 block">
              Describe the Emergency
            </Label>
            <Textarea
              id="description"
              placeholder="E.g., Patient having severe chest pain and difficulty breathing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 mb-4 resize-none"
              disabled={isRecording}
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleVoiceInput}
                disabled={isRecording || isAnalyzing}
                className="flex-1"
              >
                {isRecording ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Recording...
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Input
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleAnalyze()}
                disabled={isAnalyzing || !description.trim()}
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    AI Analyze
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* AI Analysis Results */}
        {aiResult && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Card className="p-6 border-2 border-secondary">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-secondary" />
                <h3 className="text-lg">AI Classification Results</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Emergency Type</p>
                    <Badge variant="outline" className="text-sm">
                      {aiResult.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Severity Level</p>
                    <Badge className={getSeverityColor(aiResult.severity)}>
                      {aiResult.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">AI Confidence</p>
                    <span className="text-sm">{Math.round(aiResult.confidence * 100)}%</span>
                  </div>
                  <Progress value={aiResult.confidence * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                    <span className={`text-sm ${getRiskColor(aiResult.riskScore)}`}>
                      {aiResult.riskScore}/100
                    </span>
                  </div>
                  <Progress
                    value={aiResult.riskScore}
                    className="h-2"
                  />
                </div>

                {aiResult.keywords.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Detected Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {aiResult.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-3 mt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#43A047] mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Recommended Action:</span>{' '}
                        {aiResult.severity === 'critical'
                          ? 'Immediate dispatch of Advanced Life Support unit'
                          : aiResult.severity === 'high'
                            ? 'Priority dispatch with Basic Life Support unit'
                            : 'Standard emergency response protocol'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Patient Quick Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg mb-4">Patient Information (Optional)</h3>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Full name" onChange={(e) => setPatientName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" type="tel" placeholder="+1 (555) 000-0000" onChange={(e) => setContactNumber(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="medical">Medical Conditions</Label>
                  <Input id="medical" placeholder="e.g., Diabetes, Asthma" onChange={(e) => setMedicalConditions(e.target.value)} />
                </div>
              </div>
            </div>

            {mockUser.medicalInfo && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="text-sm">Your Medical Profile</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Blood Type: {mockUser.medicalInfo.bloodType}</div>
                  <div>Allergies: {mockUser.medicalInfo.allergies?.join(', ')}</div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="sticky bottom-4 z-10"
        >
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !description.trim()}
            size="lg"
            className="w-full shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Emergency...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Emergency Request
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-3">
            By submitting, emergency services will be notified immediately
          </p>
        </motion.div>
      </div>
    </div>
  );
}
