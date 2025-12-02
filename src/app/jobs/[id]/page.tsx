import { supabase } from '@/app/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JobApplyButton from '@/components/jobs/JobApplyButton';

interface PageProps {
  params: { id: string };
}

// This interface should be synchronized with your Supabase table schema
interface Job {
  id: string;
  job_title: string;
  company_name: string;
  salary_range: string;
  location: string;
  job_description: string;
  requirements: string[];
  posted_date: string;
  job_type: string;
  experience_level: string;
  category: string;
}

async function getJob(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }
  return data;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
       <Link href="/jobs" className="inline-block text-amber-400 hover:underline mb-6">
          &larr; Back to all jobs
        </Link>
      <div className="bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <span className="bg-slate-700 text-amber-400 text-sm font-semibold px-3 py-1 rounded-full">{job.job_type}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4">{job.job_title}</h1>
            <p className="text-xl text-slate-300 mt-2">{job.company_name} - {job.location}</p>
          </div>
          <div className="mt-6 md:mt-0 md:text-right">
            <p className="text-2xl font-bold text-amber-400">{job.salary_range}</p>
            <p className="text-slate-400 mt-1">Posted on: {new Date(job.posted_date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="border-t border-slate-700 my-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
            <p className="text-slate-300 whitespace-pre-line">{job.job_description}</p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Requirements</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
            </ul>
          </div>
          <div>
            <JobApplyButton jobId={job.id} jobTitle={job.job_title} />
          </div>
        </div>
      </div>
    </div>
  );
}
