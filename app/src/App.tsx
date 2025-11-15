import { useState } from 'react';
import { Header } from './components/Header';
import { LandingDashboard } from './components/LandingDashboard';
import { SurgeryPredictor } from './components/SurgeryPredictor';
import { PredictionOutput } from './components/PredictionOutput';
import { ScheduleView } from './components/ScheduleView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

export type Page = 'dashboard' | 'predict' | 'schedule' | 'analytics' | 'results';

export interface PredictionData {
  surgeon: string;
  procedure: string;
  anaesthesia: string;
  nurses: number;
  age: number;
  bmi: number;
  hemoglobin: number;
  asa: string;
  comorbidities: {
    hypertension: boolean;
    diabetes: boolean;
    copd: boolean;
    heartDisease: boolean;
    ckd: boolean;
    obesity: boolean;
    coagulopathy: boolean;
  };
}

export interface PredictionResult extends PredictionData {
  predictedMinutes: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handlePredict = (data: PredictionData) => {
    // Calculate predicted duration based on inputs
    const baseTime = 90; // Base surgery time in minutes
    
    // Add time based on complexity factors
    let totalTime = baseTime;
    
    // Procedure complexity (simplified)
    if (data.procedure.includes('Joint Replacement')) totalTime += 60;
    if (data.procedure.includes('Cardiac')) totalTime += 90;
    if (data.procedure.includes('Neurosurgery')) totalTime += 120;
    if (data.procedure.includes('Appendectomy')) totalTime += 30;
    
    // Patient factors
    if (data.age > 70) totalTime += 15;
    if (data.bmi > 30) totalTime += 10;
    if (data.asa === '4' || data.asa === '5') totalTime += 20;
    
    // Comorbidities
    const comorbidityCount = Object.values(data.comorbidities).filter(Boolean).length;
    totalTime += comorbidityCount * 5;
    
    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (totalTime > 180) riskLevel = 'high';
    else if (totalTime > 120) riskLevel = 'medium';
    
    const result: PredictionResult = {
      ...data,
      predictedMinutes: totalTime,
      riskLevel
    };
    
    setPredictionResult(result);
    setCurrentPage('results');
  };

  const handleAddToSchedule = () => {
    setCurrentPage('schedule');
  };

  const handleRunAnother = () => {
    setPredictionResult(null);
    setCurrentPage('predict');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {currentPage === 'dashboard' && (
          <LandingDashboard onStartPrediction={() => setCurrentPage('predict')} />
        )}
        
        {currentPage === 'predict' && (
          <SurgeryPredictor onPredict={handlePredict} />
        )}
        
        {currentPage === 'results' && predictionResult && (
          <PredictionOutput 
            result={predictionResult} 
            onAddToSchedule={handleAddToSchedule}
            onRunAnother={handleRunAnother}
          />
        )}
        
        {currentPage === 'schedule' && (
          <ScheduleView predictionResult={predictionResult} />
        )}
        
        {currentPage === 'analytics' && (
          <AnalyticsDashboard />
        )}
      </main>
    </div>
  );
}
