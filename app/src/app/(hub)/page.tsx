import { prisma } from "@/lib/prisma";
import { AppCard } from "@/components/AppCard";
import {
  Plane,
  Shield,
  Wrench,
  Lock,
  Clock,
  FileText,
  Activity,
} from "lucide-react";

export const dynamic = "force-dynamic";

async function getLogbookStats() {
  const [totalEntries, totalHoursResult, totalAircraft] = await Promise.all([
    prisma.logEntry.count(),
    prisma.logEntry.aggregate({ _sum: { durationHours: true } }),
    prisma.aircraft.count(),
  ]);

  return {
    totalEntries,
    totalHours: totalHoursResult._sum.durationHours || 0,
    totalAircraft,
  };
}

export default async function HubDashboard() {
  const logbookStats = await getLogbookStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Vitajte v PetuniaLAB
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Testovací hub pre vývoj a ladenie aplikácií EAMG. Vyberte si modul, s
          ktorým chcete pracovať.
        </p>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-6 mb-12 shadow-xl">
        <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {logbookStats.totalEntries}
              </p>
              <p className="text-xs text-slate-400">Záznamov</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {logbookStats.totalHours.toFixed(0)}
              </p>
              <p className="text-xs text-slate-400">Hodín práce</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {logbookStats.totalAircraft}
              </p>
              <p className="text-xs text-slate-400">Lietadiel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4</p>
              <p className="text-xs text-slate-400">Moduly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppCard
          title="AME LogBook"
          description="Záznamenník praxe Aircraft Maintenance Engineer. Evidencia údržbových prác, lietadiel a licencií."
          href="/logbook"
          icon={Plane}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          status="active"
          stats={[
            { label: "Záznamov", value: logbookStats.totalEntries },
            { label: "Hodín", value: logbookStats.totalHours.toFixed(0) },
            { label: "Lietadiel", value: logbookStats.totalAircraft },
          ]}
        />

        <AppCard
          title="SMS"
          description="Safety Management System - Systém riadenia bezpečnosti leteckej prevádzky pre EAMG."
          href="/sms"
          icon={Shield}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          status="coming-soon"
        />

        <AppCard
          title="CMM"
          description="Continuous Maintenance Management - Riadenie kontinuálnej údržby a technických procesov."
          href="/cmm"
          icon={Wrench}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          status="coming-soon"
        />

        <AppCard
          title="ISMS"
          description="Information Security Management System - Systém riadenia informačnej bezpečnosti."
          href="/isms"
          icon={Lock}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          status="coming-soon"
        />
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          O PetuniaLAB
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Tento hub slúži ako testovacie prostredie pre vývoj a ladenie
          firemných aplikácií EAMG. Umožňuje vzdialený prístup k projektom vo
          vývoji, čo zjednodušuje prácu mimo domáceho stroja. Po úspešnom
          otestovaní budú moduly migrované do produkčného prostredia.
        </p>
      </div>
    </div>
  );
}
