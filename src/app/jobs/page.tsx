import { supabase } from '@/app/lib/supabase';
import JobListings from '@/components/jobs/JobListings';

export const revalidate = 60; // Revalidate data every 60 seconds

async function getJobs() {
  // NOTE: This assumes you have a 'jobs' table in Supabase
  // with columns that match the Job interface.
  const { data, error } = await supabase.from('jobs').select('*');
  
  if (error) {
    console.error('Error fetching jobs from Supabase:', error);
    return [];
  }
  
  return data;
}

export default async function JobsPage() {
  const initialJobs = await getJobs();

  return (
    <div className="container mx-auto px-6 py-12">
      <section className="py-8">
        <h1 className="text-4xl font-extrabold text-white text-center">
          Browse All Jobs
        </h1>
        <p className="text-slate-300 mt-4 text-lg text-center">
          Search, filter, and find your next opportunity in Malta.
        </p>
        <JobListings initialJobs={initialJobs ?? []} />
      </section>
    </div>
  );
}
