'use client';

import { useState } from 'react';
import ApplicationForm from '@/components/jobs/ApplicationForm';

interface JobApplyButtonProps {
  jobId: string;
  jobTitle: string;
}

export default function JobApplyButton({ jobId, jobTitle }: JobApplyButtonProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleApplicationSuccess = () => {
    setIsApplying(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide message after 5 seconds
  };

  return (
    <>
      {isApplying && (
        <ApplicationForm
          jobId={jobId}
          jobTitle={jobTitle}
          onClose={() => setIsApplying(false)}
          onSubmitSuccess={handleApplicationSuccess}
        />
      )}
      {showSuccessMessage && (
          <div className="fixed top-24 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50">
              Application submitted successfully!
          </div>
      )}
      <div className="bg-card rounded-lg shadow-lg p-6 sticky top-24">
        <h3 className="text-text font-bold text-white mb-4">Interested?</h3>
        <p className="text-slate-500 mb-6">Submit your application directly through MaltaJobPro.</p>
        <button 
          onClick={() => setIsApplying(true)} 
          className="w-full text-center block apply-btn"
        >
          Apply Now
        </button>
      </div>
    </>
  );
}
