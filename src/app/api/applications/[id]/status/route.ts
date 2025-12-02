import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const applicationId = params.id

    if (!status) {
      return NextResponse.json({ message: 'Status is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId)
      .select()

    if (error) {
      console.error('Error updating application status:', error);
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application status updated successfully!',
      application: data[0] 
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    )
  }
}
