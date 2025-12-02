'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Application {
  id: string;
  user_id: string;
  name: string;
  email: string;
  cover_letter: string;
  resume_url: string;
  status: string;
  applied_at: string;
}

interface EmployerCandidateManagerProps {
  jobId: string;
  initialApplications: Application[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'bg-blue-500/20 text-primary';
    case 'reviewing':
      return 'bg-yellow-500/20 text-secondary';
    case 'shortlisted':
      return 'bg-green-500/20 text-green-400';
    case 'interviewing':
      return 'bg-purple-500/20 text-purple-400';
    case 'offered':
      return 'bg-accent/20 text-accent';
    case 'rejected':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

export default function EmployerCandidateManager({ jobId, initialApplications }: EmployerCandidateManagerProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleStatusChange = async (appId: string, newStatus: string) => {
    setLoadingStates(prev => ({ ...prev, [appId]: true }));
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications(prevApps =>
          prevApps.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
        );
      } else {
        const errorData = await res.json();
        alert(`Failed to update status: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("An error occurred while updating status.");
    } finally {
      setLoadingStates(prev => ({ ...prev, [appId]: false }));
    }
  };

  const statusOptions = ['Submitted', 'Reviewing', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected'];

  return (
    <div className="bg-card rounded-lg shadow-lg p-8">
      {applications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map(app => (
            <div key={app.id} className="bg-slate-800 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-semibold text-white">{app.name}</h3>
              <p className="text-slate-300 text-sm mt-1">{app.email}</p>
              <p className="text-slate-400 text-xs mt-2">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  disabled={loadingStates[app.id]}
                  className="bg-slate-800 text-white border border-slate-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex gap-2">
                {app.resume_url && (
                  <a
                    href="#" // In a real app, this would be a link to the stored resume
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-secondary/20 text-secondary text-sm px-3 py-1 rounded-md hover:bg-secondary/30 transition-colors"
                  >
                    View Resume
                  </a>
                )}
                <button
                  onClick={() => alert(`Cover Letter for ${app.name}:\n${app.cover_letter}`)}
                  className="inline-block bg-primary/20 text-primary text-sm px-3 py-1 rounded-md hover:bg-primary/30 transition-colors"
                >
                  View Cover Letter
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500">
          <h2 className="text-xl font-semibold text-white">No applications for this job yet.</h2>
          <p className="mt-2">Share your job posting to attract more candidates!</p>
        </div>
      )}
    </div>
  );
}
