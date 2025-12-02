import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params

    const { data: applications, error } = await supabase
      .from('applications')
      .select(`
        id,
        job_id,
        status,
        applied_at,
        jobs (
          job_title,
          company_name
        )
      `)
      .eq('user_id', userId)
      .order('applied_at', { ascending: false })

    if (error) {
      console.error('Error fetching applications from Supabase:', error);
      throw error
    }

    // Format the data to match expected interface in the frontend
    const populatedApplications = applications?.map((app: any) => ({
      id: app.id,
      jobId: app.job_id,
      status: app.status,
      appliedDate: app.applied_at,
      jobDetails: {
        title: app.jobs?.job_title || 'Job Title Not Found',
        company: app.jobs?.company_name || 'Company Not Found'
      }
    })) || []

    return NextResponse.json(populatedApplications)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
