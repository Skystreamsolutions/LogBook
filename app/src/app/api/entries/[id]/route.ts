import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const entry = await prisma.logEntry.update({
    where: { id: parseInt(id) },
    data: {
      date: body.date ? new Date(body.date) : undefined,
      aircraftId: body.aircraftId ? parseInt(body.aircraftId) : undefined,
      ata: body.ata,
      taskTypeId: body.taskTypeId ? parseInt(body.taskTypeId) : undefined,
      taskDescription: body.taskDescription,
      workType: body.workType,
      licenceCategoryId: body.licenceCategoryId
        ? parseInt(body.licenceCategoryId)
        : undefined,
      durationHours: body.durationHours
        ? parseFloat(body.durationHours)
        : undefined,
      workorder: body.workorder,
      verifiedBy: body.verifiedBy,
    },
    include: {
      aircraft: true,
      taskType: true,
      licenceCategory: true,
    },
  });

  return NextResponse.json(entry);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.logEntry.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
