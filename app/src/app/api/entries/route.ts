import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";
  const aircraftId = searchParams.get("aircraftId");
  const taskTypeId = searchParams.get("taskTypeId");
  const licenceCategoryId = searchParams.get("licenceCategoryId");
  const workType = searchParams.get("workType");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  const where: Record<string, unknown> = {};

  if (search) {
    where.taskDescription = { contains: search, mode: "insensitive" };
  }
  if (aircraftId) where.aircraftId = parseInt(aircraftId);
  if (taskTypeId) where.taskTypeId = parseInt(taskTypeId);
  if (licenceCategoryId) where.licenceCategoryId = parseInt(licenceCategoryId);
  if (workType) where.workType = workType;
  if (dateFrom || dateTo) {
    where.date = {};
    if (dateFrom) (where.date as Record<string, unknown>).gte = new Date(dateFrom);
    if (dateTo) (where.date as Record<string, unknown>).lte = new Date(dateTo);
  }

  const [entries, total] = await Promise.all([
    prisma.logEntry.findMany({
      where,
      include: {
        aircraft: true,
        taskType: true,
        licenceCategory: true,
      },
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.logEntry.count({ where }),
  ]);

  return NextResponse.json({ entries, total, page, limit });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Auto-create aircraft if registration doesn't exist
  let aircraft = await prisma.aircraft.findUnique({
    where: { registration: body.registration },
  });
  if (!aircraft) {
    aircraft = await prisma.aircraft.create({
      data: {
        registration: body.registration,
        aircraftType: body.aircraftType || "Unknown",
        engine: body.engine || null,
      },
    });
  }

  const entry = await prisma.logEntry.create({
    data: {
      date: new Date(body.date),
      aircraftId: aircraft.id,
      ata: body.ata,
      taskTypeId: parseInt(body.taskTypeId),
      taskDescription: body.taskDescription,
      workType: body.workType,
      licenceCategoryId: parseInt(body.licenceCategoryId),
      durationHours: parseFloat(body.durationHours),
      workorder: body.workorder || null,
      verifiedBy: body.verifiedBy || null,
    },
    include: {
      aircraft: true,
      taskType: true,
      licenceCategory: true,
    },
  });

  return NextResponse.json(entry, { status: 201 });
}
