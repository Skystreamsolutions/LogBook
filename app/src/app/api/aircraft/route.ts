import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const aircraft = await prisma.aircraft.findMany({
    orderBy: { registration: "asc" },
    include: { _count: { select: { entries: true } } },
  });
  return NextResponse.json(aircraft);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const aircraft = await prisma.aircraft.create({
    data: {
      registration: body.registration,
      aircraftType: body.aircraftType,
      engine: body.engine || null,
    },
  });
  return NextResponse.json(aircraft, { status: 201 });
}
