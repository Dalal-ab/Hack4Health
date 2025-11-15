import { Clock, CheckCircle2, AlertTriangle, AlertCircle, Calendar, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { PredictionResult } from '../App';

interface PredictionOutputProps {
  result: PredictionResult;
  onAddToSchedule: () => void;
  onRunAnother: () => void;
}

export function PredictionOutput({ result, onAddToSchedule, onRunAnother }: PredictionOutputProps) {
  const hours = Math.floor(result.predictedMinutes / 60);
  const minutes = result.predictedMinutes % 60;
  const comorbidityCount = Object.values(result.comorbidities).filter(Boolean).length;

  const getRiskColor = () => {
    switch (result.riskLevel) {
      case 'low': return 'from-emerald-500 to-emerald-600';
      case 'medium': return 'from-amber-500 to-amber-600';
      case 'high': return 'from-red-500 to-red-600';
    }
  };

  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case 'low': return CheckCircle2;
      case 'medium': return AlertTriangle;
      case 'high': return AlertCircle;
    }
  };

  const getRiskLabel = () => {
    switch (result.riskLevel) {
      case 'low': return 'Below Average Duration';
      case 'medium': return 'Around Typical Average';
      case 'high': return 'Longer-Than-Expected Duration';
    }
  };

  const RiskIcon = getRiskIcon();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-slate-900">Prediction Results</h1>
        <p className="text-slate-600">
          Based on patient and procedure data, here's the predicted surgery duration
        </p>
      </div>

      {/* Main Results Card */}
      <Card className="p-8 bg-white border-slate-200">
        <div className="space-y-8">
          {/* Duration Display */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
              <Clock className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h2 className="text-slate-700 text-lg mb-2">Predicted Surgery Duration</h2>
              <div className="text-6xl text-slate-900 mb-2">{result.predictedMinutes}</div>
              <div className="text-xl text-slate-600">
                minutes (≈ {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`})
              </div>
            </div>
          </div>

          {/* Risk Indicator */}
          <div className={`p-6 rounded-xl bg-gradient-to-br ${getRiskColor()} text-white`}>
            <div className="flex items-center justify-center gap-3">
              <RiskIcon className="w-6 h-6" />
              <span className="text-lg">{getRiskLabel()}</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-slate-900 pb-2 border-b border-slate-200">Input Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">Surgeon</div>
                <div className="text-slate-900">{result.surgeon}</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">Procedure</div>
                <div className="text-slate-900">{result.procedure}</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">Anaesthesia</div>
                <div className="text-slate-900">{result.anaesthesia}</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">Number of Nurses</div>
                <div className="text-slate-900">{result.nurses}</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">Patient Age</div>
                <div className="text-slate-900">{result.age} years</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">BMI</div>
                <div className="text-slate-900">{result.bmi} kg/m²</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">Hemoglobin</div>
                <div className="text-slate-900">{result.hemoglobin} g/dL</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">ASA Rating</div>
                <div className="text-slate-900">ASA {result.asa}</div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg md:col-span-2">
                <div className="text-sm text-slate-600">Total Comorbidities</div>
                <div className="text-slate-900">
                  {comorbidityCount} condition{comorbidityCount !== 1 ? 's' : ''}
                  {comorbidityCount > 0 && (
                    <span className="text-slate-600 text-sm ml-2">
                      ({Object.entries(result.comorbidities)
                        .filter(([_, value]) => value)
                        .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim())
                        .map(str => str.charAt(0).toUpperCase() + str.slice(1))
                        .join(', ')})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Insights Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <div className="space-y-3">
          <h3 className="text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            Clinical Insights
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>This prediction is based on historical data from similar procedures and patient profiles</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Actual duration may vary based on intraoperative complications and findings</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Consider booking additional OR time for high-risk cases</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 justify-center">
        <Button
          onClick={onRunAnother}
          variant="outline"
          className="border-slate-300 text-slate-700 gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Run Another Prediction
        </Button>
        <Button
          onClick={onAddToSchedule}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 gap-2"
        >
          <Calendar className="w-4 h-4" />
          Add to OR Schedule
        </Button>
      </div>
    </div>
  );
}
