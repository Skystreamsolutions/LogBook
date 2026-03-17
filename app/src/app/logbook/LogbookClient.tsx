"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface Aircraft {
  id: number;
  registration: string;
  aircraftType: string;
  engine: string | null;
}

interface TaskType {
  id: number;
  code: string;
  name: string;
}

interface LicenceCategory {
  id: number;
  code: string;
  name: string;
}

interface LogEntry {
  id: number;
  date: string;
  aircraft: Aircraft;
  ata: string;
  taskType: TaskType;
  taskDescription: string;
  workType: string;
  licenceCategory: LicenceCategory;
  durationHours: number;
  workorder: string | null;
  verifiedBy: string | null;
}

interface Props {
  aircraft: Aircraft[];
  taskTypes: TaskType[];
  licenceCategories: LicenceCategory[];
}

export default function LogbookClient({
  aircraft,
  taskTypes,
  licenceCategories,
}: Props) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterAircraft, setFilterAircraft] = useState("");
  const [filterTaskType, setFilterTaskType] = useState("");
  const [filterLicence, setFilterLicence] = useState("");
  const [filterWorkType, setFilterWorkType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.set("search", search);
    if (filterAircraft) params.set("aircraftId", filterAircraft);
    if (filterTaskType) params.set("taskTypeId", filterTaskType);
    if (filterLicence) params.set("licenceCategoryId", filterLicence);
    if (filterWorkType) params.set("workType", filterWorkType);

    const res = await fetch(`/api/entries?${params}`);
    const data = await res.json();
    setEntries(data.entries);
    setTotal(data.total);
    setLoading(false);
  }, [page, search, filterAircraft, filterTaskType, filterLicence, filterWorkType]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (id: number) => {
    if (!confirm("Naozaj chcete vymazať tento záznam?")) return;
    await fetch(`/api/entries/${id}`, { method: "DELETE" });
    fetchEntries();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedAircraft = aircraft.find(
      (a) => a.id === parseInt(formData.get("aircraftId") as string)
    );

    const body = {
      date: formData.get("date"),
      registration: selectedAircraft?.registration || formData.get("registration"),
      aircraftType: selectedAircraft?.aircraftType,
      engine: selectedAircraft?.engine,
      ata: formData.get("ata"),
      taskTypeId: formData.get("taskTypeId"),
      taskDescription: formData.get("taskDescription"),
      workType: formData.get("workType"),
      licenceCategoryId: formData.get("licenceCategoryId"),
      durationHours: formData.get("durationHours"),
      workorder: formData.get("workorder"),
      verifiedBy: formData.get("verifiedBy"),
    };

    await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowForm(false);
    setPage(1);
    fetchEntries();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Logbook</h1>
          <p className="text-slate-500 mt-1">
            {total} záznamov celkom
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nový záznam
        </button>
      </div>

      {/* New Entry Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Dátum
            </label>
            <input
              type="date"
              name="date"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Lietadlo
            </label>
            <select
              name="aircraftId"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Vyberte...</option>
              {aircraft.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.registration} - {a.aircraftType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ATA
            </label>
            <input
              type="text"
              name="ata"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Typ úlohy
            </label>
            <select
              name="taskTypeId"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Vyberte...</option>
              {taskTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} - {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Typ práce
            </label>
            <select
              name="workType"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Vyberte...</option>
              <option value="SHOP">SHOP</option>
              <option value="Base">Base</option>
              <option value="Line">Line</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Kategória licencie
            </label>
            <select
              name="licenceCategoryId"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Vyberte...</option>
              {licenceCategories.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.code} - {l.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Popis úlohy
            </label>
            <input
              type="text"
              name="taskDescription"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Trvanie (h)
            </label>
            <input
              type="number"
              name="durationHours"
              step="0.01"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Workorder
            </label>
            <input
              type="text"
              name="workorder"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Overil
            </label>
            <input
              type="text"
              name="verifiedBy"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
            >
              Uložiť
            </button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Hľadať v popise..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm"
          />
        </div>
        <select
          value={filterAircraft}
          onChange={(e) => {
            setFilterAircraft(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Všetky lietadlá</option>
          {aircraft.map((a) => (
            <option key={a.id} value={a.id}>
              {a.registration}
            </option>
          ))}
        </select>
        <select
          value={filterTaskType}
          onChange={(e) => {
            setFilterTaskType(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Všetky typy</option>
          {taskTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.code}
            </option>
          ))}
        </select>
        <select
          value={filterLicence}
          onChange={(e) => {
            setFilterLicence(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Všetky licencie</option>
          {licenceCategories.map((l) => (
            <option key={l.id} value={l.id}>
              {l.code}
            </option>
          ))}
        </select>
        <select
          value={filterWorkType}
          onChange={(e) => {
            setFilterWorkType(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Všetky work types</option>
          <option value="SHOP">SHOP</option>
          <option value="Base">Base</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Dátum
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  A/C REG
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Typ lietadla
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  ATA
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Typ úlohy
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Popis
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Work Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Licencia
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">
                  Hodiny
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Workorder
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Overil
                </th>
                <th className="px-4 py-3 text-center font-medium text-slate-600">
                  Akcie
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-slate-400">
                    Načítavanie...
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-slate-400">
                    Žiadne záznamy
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(entry.date).toLocaleDateString("sk-SK")}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {entry.aircraft.registration}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {entry.aircraft.aircraftType}
                      {entry.aircraft.engine && (
                        <span className="text-slate-400">
                          {" "}
                          ({entry.aircraft.engine})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{entry.ata}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {entry.taskType.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate" title={entry.taskDescription}>
                      {entry.taskDescription}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          entry.workType === "SHOP"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {entry.workType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        {entry.licenceCategory.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {entry.durationHours.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {entry.workorder || "-"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {entry.verifiedBy || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Vymazať"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50">
            <p className="text-sm text-slate-600">
              Strana {page} z {totalPages} ({total} záznamov)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
