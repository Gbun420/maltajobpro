import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'
import type { ApiResponse } from '@/lib/types'; // Keep this import for consistent response structure

export async function POST(request: NextRequest) {
  try {
    const { jobId, name, email, coverLetter, resumeName } = await request.json()

    // In a real app, you'd get user ID from session
    // For now, using a placeholder
    const userId = 'user-1' // Placeholder for user ID

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          job_id: jobId,
          user_id: userId,
          name,
          email,
          cover_letter: coverLetter,
          resume_url: `simulated-uploads/${Date.now()}-${resumeName}`, // Keep simulation for now
          status: 'submitted',
          applied_at: new Date().toISOString(), // Add applied_at timestamp
        }
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json<ApiResponse>(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    // Simulate email notification (in production, use a real service)
    console.log(`--- Email Notification Sent ---`)
    console.log(`To: ${email}`)
    console.log(`Subject: Application Received for Job ID ${jobId}`)
    console.log(`-----------------------------`)

    return NextResponse.json<ApiResponse>(
      { success: true, message: 'Application submitted successfully!', data: data[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    )
  }
}
