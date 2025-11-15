import { TrendingUp, Clock, Target, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AnalyticsDashboard() {
  // Sample data for charts
  const predictionAccuracyData = [
    { month: 'Jan', predicted: 95, actual: 92 },
    { month: 'Feb', predicted: 110, actual: 105 },
    { month: 'Mar', predicted: 120, actual: 118 },
    { month: 'Apr', predicted: 105, actual: 108 },
    { month: 'May', predicted: 130, actual: 125 },
    { month: 'Jun', predicted: 115, actual: 117 },
  ];

  const utilizationData = [
    { day: 'Mon', utilization: 85 },
    { day: 'Tue', utilization: 92 },
    { day: 'Wed', utilization: 88 },
    { day: 'Thu', utilization: 95 },
    { day: 'Fri', utilization: 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-slate-900">Analytics Dashboard</h1>
        <p className="text-slate-600">Monitor prediction accuracy and OR performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">↑ 2.3%</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Prediction Accuracy</div>
              <div className="text-3xl text-slate-900">94.2%</div>
              <div className="text-xs text-slate-500 mt-1">Mean Absolute Error: 8.3 min</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">↑ 5.1%</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">On-Time Rate</div>
              <div className="text-3xl text-slate-900">87.5%</div>
              <div className="text-xs text-slate-500 mt-1">vs 82.4% last month</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">↑ 3.8%</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">OR Utilization</div>
              <div className="text-3xl text-slate-900">88.7%</div>
              <div className="text-xs text-slate-500 mt-1">Target: 85%</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">↓ 12.4%</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Overtime Cases</div>
              <div className="text-3xl text-slate-900">12.5%</div>
              <div className="text-xs text-slate-500 mt-1">Down from 24.9%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Predicted vs Actual Duration */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900">Predicted vs Actual Duration</h3>
              <p className="text-sm text-slate-600">Average surgery duration by month (minutes)</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Predicted"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* OR Utilization */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900">OR Utilization Rate</h3>
              <p className="text-sm text-slate-600">Weekly utilization percentage</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="utilization" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Performance Breakdown */}
      <Card className="p-6 bg-white border-slate-200">
        <div className="space-y-4">
          <h3 className="text-slate-900">Performance by Procedure Type</h3>
          
          <div className="space-y-4">
            {[
              { procedure: 'Joint Replacement', accuracy: 96.2, count: 245, avgError: 6.5 },
              { procedure: 'Cardiac Surgery', accuracy: 91.8, count: 178, avgError: 11.2 },
              { procedure: 'General Surgery', accuracy: 95.5, count: 423, avgError: 7.8 },
              { procedure: 'Neurosurgery', accuracy: 89.3, count: 92, avgError: 14.5 },
              { procedure: 'Laparoscopic', accuracy: 97.1, count: 312, avgError: 5.2 },
            ].map((item) => (
              <div key={item.procedure} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{item.procedure}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-600">{item.count} cases</span>
                    <span className="text-blue-600">{item.accuracy}% accurate</span>
                    <span className="text-slate-500">±{item.avgError} min</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="space-y-3">
            <h3 className="text-slate-900">Key Insights</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Prediction accuracy has improved 2.3% over the last quarter</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Laparoscopic procedures show highest prediction accuracy (97.1%)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>OR utilization is above target, indicating efficient scheduling</span>
              </li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <div className="space-y-3">
            <h3 className="text-slate-900">Recommendations</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-emerald-600">•</span>
                <span>Consider additional buffer time for neurosurgery cases</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600">•</span>
                <span>Maintain current scheduling practices for general surgery</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600">•</span>
                <span>Review staffing for Thursday to maintain high utilization</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
