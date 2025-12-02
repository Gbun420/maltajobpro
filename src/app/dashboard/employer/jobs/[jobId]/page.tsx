import { supabase } from '@/app/lib/supabase'
import { notFound } from 'next/navigation'
import EmployerCandidateManager from '@/components/dashboard/employer/EmployerCandidateManager';

interface PageProps {
  params: { jobId: string }
}

export default async function EmployerJobCandidatesPage({ params }: PageProps) {
  // Fetch job details
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('id, job_title, company_name') // Select only necessary fields
    .eq('id', params.jobId)
    .single()

  if (jobError || !job) {
    notFound()
  }

  // Fetch applications for this job
  const { data: applications, error: appsError } = await supabase
    .from('applications')
    .select('id, user_id, name, email, cover_letter, resume_url, status, applied_at')
    .eq('job_id', params.jobId)
    .order('applied_at', { ascending: false })

  if (appsError) {
    console.error('Error fetching applications:', appsError)
    // Depending on desired behavior, you might want to show an error state
    // or return an empty array for applications
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">
        Candidate Management: {job.job_title}
      </h1>
      <p className="text-slate-300 mb-8">Company: {job.company_name}</p>
      
      <EmployerCandidateManager 
        jobId={params.jobId}
        initialApplications={applications || []} 
      />
    </div>
  )
}
