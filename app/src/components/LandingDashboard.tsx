import { Activity, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface LandingDashboardProps {
  onStartPrediction: () => void;
}

export function LandingDashboard({ onStartPrediction }: LandingDashboardProps) {
  const valueCards = [
    {
      icon: TrendingUp,
      title: 'Reduce Cancellations',
      description: 'Decrease last-minute cancellations by up to 20% with accurate duration forecasting',
      metric: '20%',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Activity,
      title: 'Improve OR Utilization',
      description: 'Optimize room usage and maximize throughput with data-driven scheduling',
      metric: '↑15%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Lower Overtime & Burnout',
      description: 'Reduce staff overtime and fatigue with predictable surgery schedules',
      metric: '↓30%',
      color: 'from-violet-500 to-violet-600'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
          <Activity className="w-4 h-4" />
          <span className="text-sm">AI-Powered Surgical Intelligence</span>
        </div>
        
        <h1 className="text-slate-900 max-w-4xl mx-auto">
          AI-Enhanced OR Scheduling
        </h1>
        
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Predict surgery duration with patient-specific data to reduce delays, 
          cancellations, and costs while improving outcomes for patients and staff.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            onClick={onStartPrediction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Start a Prediction
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            View Demo
          </Button>
        </div>
      </div>

      {/* Value Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {valueCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="p-6 bg-white border-slate-200 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl text-slate-900">{card.metric}</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-slate-900">{card.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white rounded-2xl border border-slate-200">
        <div className="text-center space-y-1">
          <div className="text-3xl text-blue-600">2,847</div>
          <div className="text-sm text-slate-600">Predictions Made</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl text-blue-600">94.2%</div>
          <div className="text-sm text-slate-600">Accuracy Rate</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl text-blue-600">12</div>
          <div className="text-sm text-slate-600">Operating Rooms</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl text-blue-600">156</div>
          <div className="text-sm text-slate-600">Active Surgeons</div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Today's Schedule</h3>
              <p className="text-sm text-slate-600">8 surgeries planned across 4 ORs</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-violet-50 to-white border-violet-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Recent Analytics</h3>
              <p className="text-sm text-slate-600">View performance metrics and insights</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
