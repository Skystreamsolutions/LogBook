"use client";

import { useState } from "react";
import { Plus, Plane } from "lucide-react";

interface AircraftData {
  id: number;
  registration: string;
  aircraftType: string;
  engine: string | null;
  entryCount: number;
  totalHours: number;
}

export default function AircraftClient({
  aircraft,
}: {
  aircraft: AircraftData[];
}) {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch("/api/aircraft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registration: formData.get("registration"),
        aircraftType: formData.get("aircraftType"),
        engine: formData.get("engine"),
      }),
    });
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Lietadlá</h1>
          <p className="text-slate-500 mt-1">
            Databáza {aircraft.length} lietadiel
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nové lietadlo
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Registrácia
            </label>
            <input
              type="text"
              name="registration"
              required
              placeholder="OM-XXX"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Typ lietadla
            </label>
            <input
              type="text"
              name="aircraftType"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Motor
            </label>
            <input
              type="text"
              name="engine"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aircraft.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{a.registration}</h3>
                  <p className="text-slate-500 text-sm">{a.aircraftType}</p>
                </div>
              </div>
            </div>
            {a.engine && (
              <p className="text-sm text-slate-400 mt-2">Motor: {a.engine}</p>
            )}
            <div className="mt-4 pt-4 border-t flex justify-between text-sm">
              <div>
                <p className="text-slate-400">Záznamy</p>
                <p className="font-semibold text-lg">{a.entryCount}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400">Celkom hodín</p>
                <p className="font-semibold text-lg">
                  {a.totalHours.toFixed(1)} h
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
