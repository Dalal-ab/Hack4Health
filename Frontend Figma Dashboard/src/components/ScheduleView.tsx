import { useState } from 'react';
import { Clock, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PredictionResult } from '../App';

interface ScheduleViewProps {
  predictionResult: PredictionResult | null;
}

interface ScheduledSurgery {
  id: string;
  orRoom: string;
  startTime: string;
  endTime: string;
  procedure: string;
  surgeon: string;
  status: 'predicted' | 'completed' | 'overrun';
  duration: number;
}

export function ScheduleView({ predictionResult }: ScheduleViewProps) {
  const [filterSurgeon, setFilterSurgeon] = useState<string>('all');
  const [filterProcedure, setFilterProcedure] = useState<string>('all');
  const [filterASA, setFilterASA] = useState<string>('all');

  // Generate sample schedule data
  const scheduledSurgeries: ScheduledSurgery[] = [
    {
      id: '1',
      orRoom: 'OR 1',
      startTime: '08:00',
      endTime: '10:00',
      procedure: 'Hip Joint Replacement',
      surgeon: 'Dr. Sarah Chen',
      status: 'completed',
      duration: 120
    },
    {
      id: '2',
      orRoom: 'OR 2',
      startTime: '07:30',
      endTime: '09:30',
      procedure: 'Cholecystectomy',
      surgeon: 'Dr. Michael Torres',
      status: 'completed',
      duration: 120
    },
    {
      id: '3',
      orRoom: 'OR 1',
      startTime: '10:30',
      endTime: '12:45',
      procedure: 'Cardiac Bypass',
      surgeon: 'Dr. Emily Roberts',
      status: 'overrun',
      duration: 135
    },
    {
      id: '4',
      orRoom: 'OR 3',
      startTime: '09:00',
      endTime: '10:30',
      procedure: 'Appendectomy (Laparoscopic)',
      surgeon: 'Dr. James Kumar',
      status: 'predicted',
      duration: 90
    },
    {
      id: '5',
      orRoom: 'OR 2',
      startTime: '10:00',
      endTime: '12:30',
      procedure: 'Knee Joint Replacement',
      surgeon: 'Dr. Lisa Anderson',
      status: 'predicted',
      duration: 150
    },
  ];

  // Add the new prediction if it exists
  if (predictionResult) {
    scheduledSurgeries.push({
      id: 'new',
      orRoom: 'OR 3',
      startTime: '14:00',
      endTime: `${14 + Math.floor(predictionResult.predictedMinutes / 60)}:${String(predictionResult.predictedMinutes % 60).padStart(2, '0')}`,
      procedure: predictionResult.procedure,
      surgeon: predictionResult.surgeon,
      status: 'predicted',
      duration: predictionResult.predictedMinutes
    });
  }

  const timeSlots = Array.from({ length: 15 }, (_, i) => i + 6); // 6 AM to 8 PM
  const orRooms = ['OR 1', 'OR 2', 'OR 3'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'predicted': return 'bg-blue-500 border-blue-600';
      case 'completed': return 'bg-slate-400 border-slate-500';
      case 'overrun': return 'bg-red-500 border-red-600';
      default: return 'bg-slate-400';
    }
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getTopPosition = (time: string) => {
    const minutes = timeToMinutes(time);
    const startMinutes = 6 * 60; // 6 AM
    return ((minutes - startMinutes) / 60) * 80; // 80px per hour
  };

  const getHeight = (duration: number) => {
    return (duration / 60) * 80; // 80px per hour
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-slate-900">OR Daily Schedule</h1>
          <p className="text-slate-600">View and manage today's operating room schedule</p>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <CalendarIcon className="w-5 h-5" />
          <span>Today: November 15, 2025</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <h3 className="text-slate-900">Filters</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filter-surgeon">Filter by Surgeon</Label>
              <Select value={filterSurgeon} onValueChange={setFilterSurgeon}>
                <SelectTrigger id="filter-surgeon" className="bg-white border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Surgeons</SelectItem>
                  <SelectItem value="chen">Dr. Sarah Chen</SelectItem>
                  <SelectItem value="torres">Dr. Michael Torres</SelectItem>
                  <SelectItem value="roberts">Dr. Emily Roberts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-procedure">Filter by Procedure</Label>
              <Select value={filterProcedure} onValueChange={setFilterProcedure}>
                <SelectTrigger id="filter-procedure" className="bg-white border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Procedures</SelectItem>
                  <SelectItem value="joint">Joint Replacement</SelectItem>
                  <SelectItem value="cardiac">Cardiac</SelectItem>
                  <SelectItem value="general">General Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-asa">Filter by ASA Rating</Label>
              <Select value={filterASA} onValueChange={setFilterASA}>
                <SelectTrigger id="filter-asa" className="bg-white border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ASA Ratings</SelectItem>
                  <SelectItem value="1-2">ASA 1-2</SelectItem>
                  <SelectItem value="3-4">ASA 3-4</SelectItem>
                  <SelectItem value="5">ASA 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-6 p-4 bg-white rounded-lg border border-slate-200">
        <span className="text-slate-700">Status:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500"></div>
          <span className="text-sm text-slate-600">Predicted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-400"></div>
          <span className="text-sm text-slate-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span className="text-sm text-slate-600">Overrun</span>
        </div>
      </div>

      {/* Schedule Grid */}
      <Card className="p-6 bg-white border-slate-200 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-4">
            {/* Header */}
            <div className="text-slate-600 text-sm">Time</div>
            {orRooms.map((room) => (
              <div key={room} className="text-center text-slate-900 p-3 bg-blue-50 rounded-lg border border-blue-100">
                {room}
              </div>
            ))}

            {/* Time slots and schedule */}
            <div className="col-span-4 grid grid-cols-[80px_repeat(3,1fr)] gap-4 relative">
              {/* Time labels */}
              <div className="space-y-[60px]">
                {timeSlots.map((hour) => (
                  <div key={hour} className="text-sm text-slate-600 h-5">
                    {String(hour).padStart(2, '0')}:00
                  </div>
                ))}
              </div>

              {/* OR columns with surgeries */}
              {orRooms.map((room) => (
                <div key={room} className="relative border-l border-slate-200" style={{ height: `${timeSlots.length * 80}px` }}>
                  {/* Hour lines */}
                  {timeSlots.map((_, index) => (
                    <div
                      key={index}
                      className="absolute w-full border-t border-slate-100"
                      style={{ top: `${index * 80}px` }}
                    />
                  ))}

                  {/* Surgeries */}
                  {scheduledSurgeries
                    .filter((surgery) => surgery.orRoom === room)
                    .map((surgery) => (
                      <div
                        key={surgery.id}
                        className={`absolute left-1 right-1 rounded-lg border-2 ${getStatusColor(surgery.status)} text-white p-2 shadow-md overflow-hidden`}
                        style={{
                          top: `${getTopPosition(surgery.startTime)}px`,
                          height: `${getHeight(surgery.duration)}px`,
                          minHeight: '60px'
                        }}
                      >
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{surgery.startTime} - {surgery.endTime}</span>
                          </div>
                          <div className="line-clamp-1">{surgery.procedure}</div>
                          <div className="text-xs opacity-90">{surgery.surgeon}</div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <div className="text-sm text-slate-600">Total Surgeries</div>
          <div className="text-2xl text-slate-900">{scheduledSurgeries.length}</div>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="text-sm text-slate-600">Completed</div>
          <div className="text-2xl text-slate-900">
            {scheduledSurgeries.filter(s => s.status === 'completed').length}
          </div>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="text-sm text-slate-600">In Progress</div>
          <div className="text-2xl text-slate-900">1</div>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="text-sm text-slate-600">Upcoming</div>
          <div className="text-2xl text-slate-900">
            {scheduledSurgeries.filter(s => s.status === 'predicted').length}
          </div>
        </Card>
      </div>
    </div>
  );
}
