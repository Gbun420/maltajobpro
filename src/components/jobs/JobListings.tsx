'use client';

import { useState, useEffect, useMemo } from 'react';
import JobCard from "@/components/jobs/JobCard";
import SearchBar from "@/components/jobs/SearchBar";
import FilterBar from '@/components/jobs/FilterBar';

// This interface should be synchronized with your Supabase table schema
interface Job {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  salary_range: string;
  job_type: string;
  category: string;
  region: string;
}

interface JobListingsProps {
  initialJobs: Job[];
}

export default function JobListings({ initialJobs }: JobListingsProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    let result = jobs;

    if (keyword) {
      result = result.filter(job =>
        job.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company_name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    if (location) {
      result = result.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (category) {
      result = result.filter(job => job.category === category);
    }
    if (region) {
      result = result.filter(job => job.region === region);
    }
    setFilteredJobs(result);
  }, [keyword, location, category, region, jobs]);

  const categories = useMemo(() => [...new Set(jobs.map(job => job.category))], [jobs]);
  const regions = useMemo(() => [...new Set(jobs.map(job => job.region))], [jobs]);

  const handleSearch = (term: string, loc: string) => {
    setKeyword(term);
    setLocation(loc);
  };
  
  const handleFilterChange = (filters: { category: string; region: string }) => {
    setCategory(filters.category);
    setRegion(filters.region);
  };

  return (
    <>
      <div className="mt-8 max-w-3xl mx-auto">
         <SearchBar onSearch={handleSearch} />
      </div>

      <section className="mt-8">
        <FilterBar categories={categories} regions={regions} onFilterChange={handleFilterChange} />
        
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-slate-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white">No Jobs Found</h2>
            <p className="text-slate-400 mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </section>
    </>
  );
}
