import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
 
    const { userId, firstname, lastname, email, phone, resume, position } = await req.json();

 
    const existingInterview = await db.interview.findFirst({
      where: {
        userId,  
        position,
      },
    });

   
    if (existingInterview) {
      return NextResponse.json({ error: 'Interview for this position already exists for this user.' }, { status: 400 });
    }

  
    const user = await db.user.upsert({
      where: { id: userId },
      update: {
        firstname, 
        lastname,  
        email,     
        phone,    
        resume,   
      },
      create: {
        firstname,  
        lastname,  
        email,     
        phone,    
        resume,    
      },
    });

   
    const newInterview = await db.interview.create({
      data: {
        userId: user.id, 
        position,
        date: new Date(),
        status: 'pending',
      },
    });

 
    return NextResponse.json({ message: 'Interview created successfully', interview: newInterview }, { status: 201 });
  } catch (error) {
    console.error('Error saving interview:', error);
    return NextResponse.json({ error: 'Failed to create interview' }, { status: 500 });
  }
}
