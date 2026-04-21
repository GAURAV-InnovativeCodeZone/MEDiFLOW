// import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';

// Types (usually imported from a shared types file)
type QueueStatus = 'WAITING' | 'IN_PROGRESS' | 'DONE';

export interface QueueEntry {
  id: string;
  appointment_id: string;
  position: number;
  status: QueueStatus;
  estimated_time_mins: number;
  auto_reassigned: boolean;
}

interface QueueCardProps {
  entry?: QueueEntry;
  isDoctor?: boolean;
  onUpdateStatus?: (id: string, newStatus: QueueStatus) => void;
}

export const StatusBadge = ({ status }: { status: QueueStatus }) => {
  const styles = {
    WAITING: 'bg-amber-100 text-amber-800 border-amber-200',
    IN_PROGRESS: 'bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse',
    DONE: 'bg-slate-100 text-slate-800 border-slate-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default function QueueCard({ entry, isDoctor = false, onUpdateStatus }: QueueCardProps) {
  // Fallback for isolated preview environment where props might not be passed
  if (!entry) {
    entry = {
      id: 'mock-123',
      appointment_id: 'mock-app-456',
      position: 1,
      status: 'WAITING',
      estimated_time_mins: 15,
      auto_reassigned: false
    };
  }

  // layout prop allows smooth interpolation when the array order changes
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`p-4 mb-3 rounded-2xl border transition-colors ${
        entry.status === 'IN_PROGRESS' 
          ? 'border-emerald-400 shadow-md bg-emerald-50/40' 
          : 'border-slate-200 bg-white shadow-sm hover:border-blue-200'
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
            entry.status === 'IN_PROGRESS' 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
              : 'bg-slate-100 text-slate-700'
          }`}>
            #{entry.position}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Appointment: {entry.appointment_id.substring(0, 6)}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span className={entry.estimated_time_mins === 0 ? 'text-emerald-600 font-semibold' : ''}>
                {entry.estimated_time_mins === 0 ? 'Now Serving' : `~${entry.estimated_time_mins} mins`}
              </span>
              {entry.auto_reassigned && (
                <span className="flex items-center text-blue-700 text-xs ml-2 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  <AlertCircle className="w-3 h-3 mr-1" /> Rebalanced
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={entry.status} />
          
          {isDoctor && onUpdateStatus && entry.status !== 'DONE' && (
            <button 
              onClick={() => onUpdateStatus(entry!.id, entry!.status === 'WAITING' ? 'IN_PROGRESS' : 'DONE')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              {entry.status === 'WAITING' ? (
                <ChevronRight className="w-6 h-6 text-emerald-600" />
              ) : (
                <CheckCircle className="w-6 h-6 text-blue-600" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}