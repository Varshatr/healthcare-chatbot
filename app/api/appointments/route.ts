import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Query appointments or check booked slots
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const doctor = searchParams.get('doctor');
    const date = searchParams.get('date');

    // If querying booked slots for a specific doctor & date
    if (doctor && date) {
      const bookedAppointments = await prisma.appointment.findMany({
        where: {
          doctor,
          date,
          status: { not: 'CANCELLED' },
        },
        select: {
          timeSlot: true,
        },
      });

      const bookedSlots = bookedAppointments.map((a) => a.timeSlot);
      return NextResponse.json({ bookedSlots });
    }

    // Default: Return summary or recent appointments
    const count = await prisma.appointment.count();
    return NextResponse.json({ totalAppointments: count });
  } catch (error: any) {
    console.error('Error in GET /api/appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments data.' },
      { status: 500 }
    );
  }
}

// POST: Create a new appointment with double-booking prevention
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, department, doctor, date, timeSlot } = body;

    // Validate required fields
    if (!name || !phone || !department || !doctor || !date || !timeSlot) {
      return NextResponse.json(
        { error: 'All fields (name, phone, department, doctor, date, timeSlot) are required.' },
        { status: 400 }
      );
    }

    // Check for double booking of the same doctor, date and time slot
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctor,
        date,
        timeSlot,
        status: { not: 'CANCELLED' },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        {
          error: `The slot "${timeSlot}" on ${date} for ${doctor} is already booked. Please select another time slot or date.`,
          code: 'SLOT_ALREADY_BOOKED',
          conflictingDoctor: doctor,
          conflictingDate: date,
          conflictingSlot: timeSlot,
        },
        { status: 409 }
      );
    }

    // Generate unique human-readable booking ID
    const bookingId = 'APX-' + Math.floor(100000 + Math.random() * 900000);

    const newAppointment = await prisma.appointment.create({
      data: {
        id: bookingId,
        name: name.trim(),
        phone: phone.trim(),
        department: department.trim(),
        doctor: doctor.trim(),
        date: date.trim(),
        timeSlot: timeSlot.trim(),
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json(
      {
        message: 'Appointment booked successfully.',
        appointment: newAppointment,
        bookingId: newAppointment.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating appointment:', error);

    // Handle unique constraint failure from SQLite directly
    if (error?.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'This time slot is already booked for this doctor. Please choose another time slot.',
          code: 'SLOT_ALREADY_BOOKED',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error?.message || 'Failed to create appointment.' },
      { status: 500 }
    );
  }
}
