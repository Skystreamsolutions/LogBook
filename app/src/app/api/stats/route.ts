import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [
    totalEntries,
    totalHoursResult,
    totalAircraft,
    entriesByLicence,
    entriesByTaskType,
    entriesByMonth,
    topAircraft,
  ] = await Promise.all([
    prisma.logEntry.count(),
    prisma.logEntry.aggregate({ _sum: { durationHours: true } }),
    prisma.aircraft.count(),
    prisma.logEntry.groupBy({
      by: ["licenceCategoryId"],
      _count: true,
      _sum: { durationHours: true },
    }),
    prisma.logEntry.groupBy({
      by: ["taskTypeId"],
      _count: true,
      _sum: { durationHours: true },
    }),
    prisma.$queryRaw`
      SELECT
        TO_CHAR(date, 'YYYY-MM') as month,
        COUNT(*)::int as count,
        SUM("durationHours") as hours
      FROM "LogEntry"
      GROUP BY TO_CHAR(date, 'YYYY-MM')
      ORDER BY month
    `,
    prisma.logEntry.groupBy({
      by: ["aircraftId"],
      _count: true,
      _sum: { durationHours: true },
      orderBy: { _sum: { durationHours: "desc" } },
      take: 10,
    }),
  ]);

  // Enrich with names
  const licenceCategories = await prisma.licenceCategory.findMany();
  const taskTypes = await prisma.taskType.findMany();
  const aircraft = await prisma.aircraft.findMany();

  const licenceMap = new Map(licenceCategories.map((l) => [l.id, l]));
  const taskTypeMap = new Map(taskTypes.map((t) => [t.id, t]));
  const aircraftMap = new Map(aircraft.map((a) => [a.id, a]));

  return NextResponse.json({
    totalEntries,
    totalHours: totalHoursResult._sum.durationHours || 0,
    totalAircraft,
    totalLicenceCategories: licenceCategories.length,
    byLicence: entriesByLicence.map((e) => ({
      ...e,
      licence: licenceMap.get(e.licenceCategoryId),
    })),
    byTaskType: entriesByTaskType.map((e) => ({
      ...e,
      taskType: taskTypeMap.get(e.taskTypeId),
    })),
    byMonth: entriesByMonth,
    topAircraft: topAircraft.map((e) => ({
      ...e,
      aircraft: aircraftMap.get(e.aircraftId),
    })),
  });
}
