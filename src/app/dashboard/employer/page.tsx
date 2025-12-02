'use client';

import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  posted_date: string;
}

// Client component wrapper for fetching data and rendering
const EmployerDashboardClient = () => {
  const [employerJobs, setEmployerJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // For logged-in user details
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndJobs = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/login'); // Redirect to login if not authenticated
        return;
      }
      setUser(session.user);
      
      // In a real app, you would fetch the company_name from a user profile table
      // associated with the user. For this prototype, we'll hardcode or derive.
      const userCompanyName = "Betsson Group"; // Placeholder based on previous data
      
      const { data, error } = await supabase
        .from('jobs')
        .select('id, job_title, company_name, location, posted_date')
        .eq('company_name', userCompanyName) // Filter by company name for prototype
        .order('posted_date', { ascending: false });

      if (error) {
        console.error('Error fetching employer jobs from Supabase:', error);
        setEmployerJobs([]);
      } else {
        setEmployerJobs(data || []);
      }
      setIsLoading(false);
    };
    fetchUserAndJobs();
  }, [router]);

  if (isLoading) {
    return <div className="container mx-auto px-6 py-12 text-center text-text">Loading employer dashboard...</div>;
  }

  // Assuming user is authenticated and is an employer
  const companyName = "Betsson Group"; // This should come from user's profile in a real app

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text">Employer Dashboard</h1>
          <p className="text-slate-400">Manage your job postings for {companyName}</p>
        </div>
        <Link href="/dashboard/employer/post-job">
          <button className="btn-primary">
            Post a New Job
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-text mb-6">Your Active Listings</h2>
        {employerJobs.length > 0 ? (
          <div className="space-y-4">
            {employerJobs.map(job => (
              <div key={job.id} className="bg-slate-800 p-4 rounded-md flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.job_title}</h3>
                  <p className="text-slate-400">{job.location} - Posted on {new Date(job.posted_date).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-4">
                  <Link href={`/jobs/${job.id}`} className="text-primary hover:underline">View Job</Link>
                  <Link href={`/dashboard/employer/jobs/${job.id}`}>
                    <button className="bg-secondary/20 text-secondary text-sm px-3 py-1 rounded-md hover:bg-secondary/30 transition-colors">
                      View Applicants
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <h2 className="text-xl font-semibold text-text">No active job listings.</h2>
            <p className="mt-2">Post a new job to start receiving applications!</p>
            <Link href="/dashboard/employer/post-job">
              <button className="btn-primary mt-6">
                Post New Job
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboardClient;
