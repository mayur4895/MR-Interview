import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
 

export async function POST(req: NextRequest) {
  try {
    const { firstname, lastname, email, phone, resume, position } = await req.json();

    // Save the interview data into the database
    const newInterview = await  db.interview.create({
      data: {
        user: {
          connectOrCreate: {
            where: { email },
            create: {
              firstname,
              lastname,
              email,
              phone,
              resume,
            },
          },
        },
        position,  // The position field from the form
        date: new Date(),  // Add a date for the interview (you could get this from the form as well)
        status: 'pending',  // Default status
      },
    });

    return NextResponse.json({ message: 'Interview created successfully', interview: newInterview }, { status: 201 });
  } catch (error) {
    console.error('Error saving interview:', error);
    return NextResponse.json({ error: 'Failed to create interview' }, { status: 500 });
  }
}
