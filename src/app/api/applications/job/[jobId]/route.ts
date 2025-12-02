import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params

    const { data: applications, error } = await supabase
      .from('applications')
      .select(`
        id,
        user_id,
        name,
        email,
        cover_letter,
        resume_url,
        status,
        applied_at,
        jobs (
          job_title,
          company_name
        )
      `)
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false })

    if (error) {
      console.error('Error fetching job applications from Supabase:', error);
      throw error
    }

    return NextResponse.json(applications)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
