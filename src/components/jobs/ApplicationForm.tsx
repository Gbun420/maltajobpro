'use client';

import { useState } from 'react';
import type { ApiResponse } from '@/lib/types';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const ApplicationForm = ({ jobId, jobTitle, onClose, onSubmitSuccess }: ApplicationFormProps) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // File validation (client-side)
      if (file.size > 5 * 1024 * 1024) {
        setError('File is too large. Maximum size is 5MB.');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setError('Invalid file type. Please upload a PDF or DOCX file.');
        return;
      }
      setError('');
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume.');
      return;
    }
    setError('');
    setLoading(true);

    // This simulates a multipart/form-data submission
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);
    // In a real app, user details would be from session/auth context
    formData.append('userId', 'user-1'); 
    formData.append('name', 'John Doe');
    formData.append('email', 'seeker@example.com');

    try {
      // The fetch call to a real multipart API would be here.
      // For our simulation, we'll just use a standard JSON post.
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          coverLetter,
          resumeName: resume.name, // Simulate upload by sending name
          userId: 'user-1',
          name: 'John Doe',
          email: 'seeker@example.com'
        }),
      });

      const data: ApiResponse = await res.json();
      if (data.success) {
        onSubmitSuccess();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">&times;</button>
        <h2 className="text-2xl font-bold text-text mb-2">Apply for {jobTitle}</h2>
        <p className="text-slate-500 mb-6">Submit your application</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="coverLetter" className="block text-text mb-2">Cover Letter (Optional)</label>
            <textarea
              id="coverLetter"
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full bg-slate-100 text-text placeholder-slate-400 px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Tell the employer why you're a great fit..."
            />
          </div>
          <div className="mb-6">
            <label htmlFor="resume" className="block text-text mb-2">Resume (PDF or DOCX, max 5MB)</label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              className="w-full text-sm text-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-amber-500"
              required
            />
             {resume && <p className="text-sm text-green-400 mt-2">Selected: {resume.name}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="text-primary hover:text-blue-700">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
