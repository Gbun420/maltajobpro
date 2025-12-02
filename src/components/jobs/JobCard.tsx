import Link from 'next/link';

interface Job {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  salary_range: string;
  job_type: string;
  category: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Link href={`/jobs/${job.id}`} className="block w-full">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg h-full border border-transparent hover:border-primary transition-all duration-300 group">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
              {job.job_title}
            </h3>
            <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
              {job.job_type}
            </span>
        </div>
        <p className="text-slate-300 mt-2">{job.company_name}</p>
        <p className="text-slate-400 mt-1">{job.location}</p>
        <div className="mt-4">
          <p className="text-lg font-semibold text-white">{job.salary_range}</p>
          <p className="text-sm text-slate-400 mt-2">Category: {job.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
