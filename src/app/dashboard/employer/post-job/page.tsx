'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostJobPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [category, setCategory] = useState('IT'); // Default category

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // In a real application, you'd send this data to an API endpoint
    // For this prototype, we'll just simulate a submission.
    console.log({
      jobTitle, companyName, jobDescription, location, salaryRange, jobType, category
    });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Job posted successfully! (Simulated)');
      setJobTitle('');
      setCompanyName('');
      setJobDescription('');
      setLocation('');
      setSalaryRange('');
      setJobType('Full-time');
      setCategory('IT');
    } catch (error) {
      setMessage('Failed to post job. (Simulated)');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    'IT', 'iGaming', 'Finance', 'Marketing', 'Human Resources', 'Sales', 'Other'
  ];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-text mb-8">Post a New Job</h1>
      <div className="bg-card rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        {message && (
          <div className={`p-3 rounded-md mb-4 ${message.includes('successfully') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="jobTitle" className="block text-text mb-2">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-text mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <div>
            <label htmlFor="jobDescription" className="block text-text mb-2">Job Description</label>
            <textarea
              id="jobDescription"
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter a detailed job description..."
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-text mb-2">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div>
              <label htmlFor="salaryRange" className="block text-text mb-2">Salary Range (e.g., €40,000 - €50,000)</label>
              <input
                type="text"
                id="salaryRange"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobType" className="block text-text mb-2">Job Type</label>
              <select
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-text mb-2">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary"
          >
            {isLoading ? 'Posting Job...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}
