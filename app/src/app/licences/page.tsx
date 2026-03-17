import { prisma } from "@/lib/prisma";
import { Shield, Clock, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LicencesPage() {
  const licenceCategories = await prisma.licenceCategory.findMany({
    orderBy: { code: "asc" },
    include: {
      entries: {
        select: {
          durationHours: true,
          date: true,
          aircraft: { select: { registration: true } },
        },
        orderBy: { date: "desc" },
      },
    },
  });

  const taskTypes = await prisma.taskType.findMany({
    orderBy: { code: "asc" },
    include: {
      _count: { select: { entries: true } },
      entries: {
        select: { durationHours: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Licencie a Typy prác
        </h1>
        <p className="text-slate-500 mt-1">
          Prehľad kategórií licencií a typov údržbárskych prác
        </p>
      </div>

      {/* Licence Categories */}
      <div>
        <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Kategórie licencií
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {licenceCategories.map((lc) => {
            const totalHours = lc.entries.reduce(
              (sum, e) => sum + e.durationHours,
              0
            );
            const uniqueAircraft = new Set(
              lc.entries.map((e) => e.aircraft.registration)
            );
            const lastEntry = lc.entries[0];

            return (
              <div
                key={lc.id}
                className="bg-white rounded-xl shadow-sm border p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{lc.code}</h3>
                    <p className="text-slate-500 text-sm">{lc.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {lc.entries.length}
                    </p>
                    <p className="text-xs text-slate-400">Záznamy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {totalHours.toFixed(0)}
                    </p>
                    <p className="text-xs text-slate-400">Hodín</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {uniqueAircraft.size}
                    </p>
                    <p className="text-xs text-slate-400">Lietadiel</p>
                  </div>
                </div>
                {lastEntry && (
                  <p className="text-xs text-slate-400 mt-3">
                    Posledný záznam:{" "}
                    {new Date(lastEntry.date).toLocaleDateString("sk-SK")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Types */}
      <div>
        <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Typy prác
        </h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Kód
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Názov
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">
                  Počet záznamov
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">
                  Celkom hodín
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Podiel
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {taskTypes.map((tt) => {
                const totalHours = tt.entries.reduce(
                  (sum, e) => sum + e.durationHours,
                  0
                );
                const maxHours = Math.max(
                  ...taskTypes.map((t) =>
                    t.entries.reduce((s, e) => s + e.durationHours, 0)
                  )
                );
                return (
                  <tr key={tt.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {tt.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{tt.name}</td>
                    <td className="px-4 py-3 text-right">{tt._count.entries}</td>
                    <td className="px-4 py-3 text-right font-mono">
                      {totalHours.toFixed(1)} h
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${maxHours > 0 ? (totalHours / maxHours) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <Clock className="w-3 h-3 text-slate-400" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
