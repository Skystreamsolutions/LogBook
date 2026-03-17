import { prisma } from "@/lib/prisma";
import { Plane, Clock, Wrench, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const [totalEntries, totalHoursResult, totalAircraft, licenceCategories] =
    await Promise.all([
      prisma.logEntry.count(),
      prisma.logEntry.aggregate({ _sum: { durationHours: true } }),
      prisma.aircraft.count(),
      prisma.licenceCategory.count(),
    ]);

  const byLicence = await prisma.logEntry.groupBy({
    by: ["licenceCategoryId"],
    _count: true,
    _sum: { durationHours: true },
  });

  const byTaskType = await prisma.logEntry.groupBy({
    by: ["taskTypeId"],
    _count: true,
    _sum: { durationHours: true },
    orderBy: { _sum: { durationHours: "desc" } },
    take: 10,
  });

  const topAircraft = await prisma.logEntry.groupBy({
    by: ["aircraftId"],
    _count: true,
    _sum: { durationHours: true },
    orderBy: { _sum: { durationHours: "desc" } },
    take: 8,
  });

  const licences = await prisma.licenceCategory.findMany();
  const taskTypes = await prisma.taskType.findMany();
  const aircraft = await prisma.aircraft.findMany();

  return {
    totalEntries,
    totalHours: totalHoursResult._sum.durationHours || 0,
    totalAircraft,
    totalLicenceCategories: licenceCategories,
    byLicence: byLicence.map((e) => ({
      ...e,
      licence: licences.find((l) => l.id === e.licenceCategoryId),
    })),
    byTaskType: byTaskType.map((e) => ({
      ...e,
      taskType: taskTypes.find((t) => t.id === e.taskTypeId),
    })),
    topAircraft: topAircraft.map((e) => ({
      ...e,
      aircraft: aircraft.find((a) => a.id === e.aircraftId),
    })),
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Aircraft Maintenance Engineer Experience - Patrik Gonda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Wrench className="w-6 h-6" />}
          label="Celkom záznamov"
          value={stats.totalEntries.toString()}
          color="bg-blue-500"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label="Celkom hodín"
          value={stats.totalHours.toFixed(1)}
          color="bg-green-500"
        />
        <StatCard
          icon={<Plane className="w-6 h-6" />}
          label="Lietadlá"
          value={stats.totalAircraft.toString()}
          color="bg-purple-500"
        />
        <StatCard
          icon={<Shield className="w-6 h-6" />}
          label="Kategórie licencií"
          value={stats.totalLicenceCategories.toString()}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours by Licence */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Hodiny podľa licencie
          </h2>
          <div className="space-y-3">
            {stats.byLicence.map((item) => {
              const hours = item._sum.durationHours || 0;
              const maxHours = Math.max(
                ...stats.byLicence.map((b) => b._sum.durationHours || 0)
              );
              return (
                <div key={item.licenceCategoryId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {item.licence?.code || "N/A"}
                    </span>
                    <span className="text-slate-500">
                      {hours.toFixed(1)} h ({item._count} zázn.)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all"
                      style={{
                        width: `${(hours / maxHours) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Aircraft */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Top lietadlá podľa hodín
          </h2>
          <div className="space-y-3">
            {stats.topAircraft.map((item) => {
              const hours = item._sum.durationHours || 0;
              const maxHours = Math.max(
                ...stats.topAircraft.map((b) => b._sum.durationHours || 0)
              );
              return (
                <div key={item.aircraftId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {item.aircraft?.registration} -{" "}
                      {item.aircraft?.aircraftType}
                    </span>
                    <span className="text-slate-500">
                      {hours.toFixed(1)} h
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-purple-500 h-2.5 rounded-full transition-all"
                      style={{
                        width: `${(hours / maxHours) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Task Types */}
        <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Typy prác podľa hodín
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stats.byTaskType.map((item) => {
              const hours = item._sum.durationHours || 0;
              const maxHours = Math.max(
                ...stats.byTaskType.map((b) => b._sum.durationHours || 0)
              );
              return (
                <div key={item.taskTypeId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {item.taskType?.code} - {item.taskType?.name}
                    </span>
                    <span className="text-slate-500">
                      {hours.toFixed(1)} h
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all"
                      style={{
                        width: `${(hours / maxHours) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">
      <div className={`${color} text-white p-3 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}
