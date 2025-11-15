import { useState } from 'react';
import { Stethoscope, User, Heart, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { PredictionData } from '../App';

interface SurgeryPredictorProps {
  onPredict: (data: PredictionData) => void;
}

export function SurgeryPredictor({ onPredict }: SurgeryPredictorProps) {
  const [formData, setFormData] = useState<PredictionData>({
    surgeon: '',
    procedure: '',
    anaesthesia: '',
    nurses: 3,
    age: 50,
    bmi: 25,
    hemoglobin: 14,
    asa: '',
    comorbidities: {
      hypertension: false,
      diabetes: false,
      copd: false,
      heartDisease: false,
      ckd: false,
      obesity: false,
      coagulopathy: false,
    }
  });

  const comorbidityCount = Object.values(formData.comorbidities).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.surgeon || !formData.procedure || !formData.anaesthesia || !formData.asa) {
      alert('Please fill in all required fields');
      return;
    }
    onPredict(formData);
  };

  const handleReset = () => {
    setFormData({
      surgeon: '',
      procedure: '',
      anaesthesia: '',
      nurses: 3,
      age: 50,
      bmi: 25,
      hemoglobin: 14,
      asa: '',
      comorbidities: {
        hypertension: false,
        diabetes: false,
        copd: false,
        heartDisease: false,
        ckd: false,
        obesity: false,
        coagulopathy: false,
      }
    });
  };

  const surgeons = [
    'Dr. Sarah Chen',
    'Dr. Michael Torres',
    'Dr. Emily Roberts',
    'Dr. James Kumar',
    'Dr. Lisa Anderson'
  ];

  const procedures = [
    'Appendectomy (Laparoscopic)',
    'Cholecystectomy',
    'Hip Joint Replacement',
    'Knee Joint Replacement',
    'Cardiac Bypass',
    'Hernia Repair',
    'Spinal Fusion',
    'Neurosurgery (Craniotomy)',
    'Thyroidectomy',
    'Mastectomy'
  ];

  const anaesthesiaTypes = [
    'General Anaesthesia',
    'Regional Anaesthesia',
    'Spinal Anaesthesia',
    'Local Anaesthesia',
    'Monitored Sedation'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-slate-900">Surgery Duration Predictor</h1>
        <p className="text-slate-600">
          Enter patient and procedure details to predict surgery duration
        </p>
      </div>

      {/* Section 1: Surgeon & Procedure */}
      <Card className="p-6 bg-white border-slate-200">
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <h2 className="text-slate-900">Surgeon & Procedure</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="surgeon">Select Surgeon *</Label>
              <Select value={formData.surgeon} onValueChange={(value) => setFormData({ ...formData, surgeon: value })}>
                <SelectTrigger id="surgeon" className="bg-white border-slate-300">
                  <SelectValue placeholder="Choose a surgeon" />
                </SelectTrigger>
                <SelectContent>
                  {surgeons.map((surgeon) => (
                    <SelectItem key={surgeon} value={surgeon}>{surgeon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="procedure">Select Procedure *</Label>
              <Select value={formData.procedure} onValueChange={(value) => setFormData({ ...formData, procedure: value })}>
                <SelectTrigger id="procedure" className="bg-white border-slate-300">
                  <SelectValue placeholder="Choose a procedure" />
                </SelectTrigger>
                <SelectContent>
                  {procedures.map((procedure) => (
                    <SelectItem key={procedure} value={procedure}>{procedure}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="anaesthesia">Anaesthesia Type *</Label>
              <Select value={formData.anaesthesia} onValueChange={(value) => setFormData({ ...formData, anaesthesia: value })}>
                <SelectTrigger id="anaesthesia" className="bg-white border-slate-300">
                  <SelectValue placeholder="Choose anaesthesia type" />
                </SelectTrigger>
                <SelectContent>
                  {anaesthesiaTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nurses">Number of Nurses</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, nurses: Math.max(1, formData.nurses - 1) })}
                  className="w-10 h-10 border-slate-300"
                >
                  -
                </Button>
                <Input
                  id="nurses"
                  type="number"
                  value={formData.nurses}
                  onChange={(e) => setFormData({ ...formData, nurses: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="10"
                  className="text-center bg-white border-slate-300"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, nurses: Math.min(10, formData.nurses + 1) })}
                  className="w-10 h-10 border-slate-300"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 2: Patient Information */}
      <Card className="p-6 bg-white border-slate-200">
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-slate-900">Patient Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                min="0"
                max="120"
                className="bg-white border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bmi">BMI (kg/m²)</Label>
              <Input
                id="bmi"
                type="number"
                value={formData.bmi}
                onChange={(e) => setFormData({ ...formData, bmi: parseFloat(e.target.value) || 0 })}
                min="10"
                max="60"
                step="0.1"
                className="bg-white border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hemoglobin">Hemoglobin Level (g/dL)</Label>
              <Input
                id="hemoglobin"
                type="number"
                value={formData.hemoglobin}
                onChange={(e) => setFormData({ ...formData, hemoglobin: parseFloat(e.target.value) || 0 })}
                min="5"
                max="20"
                step="0.1"
                className="bg-white border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="asa">ASA Rating *</Label>
              <Select value={formData.asa} onValueChange={(value) => setFormData({ ...formData, asa: value })}>
                <SelectTrigger id="asa" className="bg-white border-slate-300">
                  <SelectValue placeholder="Select ASA rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">ASA 1 - Normal healthy patient</SelectItem>
                  <SelectItem value="2">ASA 2 - Mild systemic disease</SelectItem>
                  <SelectItem value="3">ASA 3 - Severe systemic disease</SelectItem>
                  <SelectItem value="4">ASA 4 - Severe disease, constant threat to life</SelectItem>
                  <SelectItem value="5">ASA 5 - Moribund patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 3: Medical Comorbidities */}
      <Card className="p-6 bg-white border-slate-200">
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Heart className="w-5 h-5 text-blue-600" />
            <h2 className="text-slate-900">Medical Comorbidities</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(formData.comorbidities).map(([key, value]) => {
              const labels: Record<string, string> = {
                hypertension: 'Hypertension',
                diabetes: 'Diabetes',
                copd: 'COPD',
                heartDisease: 'Heart Disease',
                ckd: 'Chronic Kidney Disease',
                obesity: 'Obesity',
                coagulopathy: 'Coagulopathy'
              };

              return (
                <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <Label htmlFor={key} className="cursor-pointer">{labels[key]}</Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData,
                        comorbidities: { ...formData.comorbidities, [key]: checked }
                      })
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-slate-900">Total Comorbidities: </span>
              <span className="text-blue-600">{comorbidityCount}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="border-slate-300 text-slate-700"
        >
          Reset Form
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Predict Surgery Duration
        </Button>
      </div>
    </form>
  );
}
