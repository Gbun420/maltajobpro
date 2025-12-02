'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase'; // Import supabase to get user ID

interface Application {
  id: string;
  jobId: string;
  status: string;
  appliedDate: string;
  jobDetails?: {
    title: string;
    company: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'bg-blue-500/20 text-blue-400';
    case 'reviewing':
      return 'bg-yellow-500/20 text-yellow-400';
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

export default function SeekerDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user ID from Supabase session
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        setIsLoading(false); // No user, so no applications to load
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchApplications = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(`/api/applications/user/${userId}`);
          const data = await res.json();
          setApplications(data);
        } catch (error) {
          console.error("Failed to fetch applications:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchApplications();
    }
  }, [userId]);

  if (!userId) {
    return (
        <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-3xl font-bold text-text mb-4">Access Denied</h1>
            <p className="text-slate-400">Please log in to view your applications.</p>
            <Link href="/login" className="mt-6 inline-block btn-primary">
                Log In
            </Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-text mb-8">My Applications</h1>
      
      <div className="bg-card rounded-lg shadow-lg">
        {isLoading ? (
          <div className="p-8 text-center text-text">Loading your applications...</div>
        ) : applications.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {applications.map(app => (
              <li key={app.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start">
                  <div>
                    <Link href={`/jobs/${app.jobId}`} className="text-xl font-semibold text-secondary hover:underline">
                      {app.jobDetails?.title || 'Job Title Not Found'}
                    </Link>
                    <p className="text-text mt-1">{app.jobDetails?.company || 'Company Not Found'}</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Applied on: {new Date(app.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <h2 className="text-xl font-semibold text-text">No applications found.</h2>
            <p className="mt-2">You haven&apos;t applied to any jobs yet.</p>
            <Link href="/jobs" className="mt-6 inline-block btn-primary">
              Find Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
