import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function verifyAdminPassword(req: NextRequest): boolean {
  const providedPassword = req.headers.get('x-admin-password') || '';
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim() || 'hospital_admin_2026';
  return providedPassword === expectedPassword;
}

// GET: Fetch all appointments for the admin portal
export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminPassword(req)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid admin password.' },
        { status: 401 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const total = appointments.length;
    const confirmed = appointments.filter((a) => a.status === 'CONFIRMED').length;
    const cancelled = appointments.filter((a) => a.status === 'CANCELLED').length;
    const completed = appointments.filter((a) => a.status === 'COMPLETED').length;

    return NextResponse.json({
      appointments,
      metrics: {
        total,
        confirmed,
        cancelled,
        completed,
      },
    });
  } catch (error: any) {
    console.error('Error in GET /api/admin/appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments from database.' },
      { status: 500 }
    );
  }
}

// PATCH: Update appointment status (e.g. COMPLETED or CANCELLED)
export async function PATCH(req: NextRequest) {
  try {
    if (!verifyAdminPassword(req)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid admin password.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Appointment id and new status are required.' },
        { status: 400 }
      );
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ appointment: updated });
  } catch (error: any) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment status.' },
      { status: 500 }
    );
  }
}
