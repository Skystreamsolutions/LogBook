import { prisma } from "@/lib/prisma";
import AircraftClient from "./AircraftClient";

export const dynamic = "force-dynamic";

export default async function AircraftPage() {
  const aircraft = await prisma.aircraft.findMany({
    orderBy: { registration: "asc" },
    include: {
      _count: { select: { entries: true } },
      entries: {
        select: { durationHours: true },
      },
    },
  });

  const data = aircraft.map((a) => ({
    id: a.id,
    registration: a.registration,
    aircraftType: a.aircraftType,
    engine: a.engine,
    entryCount: a._count.entries,
    totalHours: a.entries.reduce((sum, e) => sum + e.durationHours, 0),
  }));

  return <AircraftClient aircraft={data} />;
}
