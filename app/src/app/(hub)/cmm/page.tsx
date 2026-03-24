import { Wrench, ArrowLeft, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";

export default function CMMPage() {
  const plannedFeatures = [
    "Plánovanie preventívnej údržby",
    "Sledovanie životnosti komponentov",
    "Správa náhradných dielov",
    "Automatické upozornenia na termíny",
    "História údržby lietadiel",
    "Integrácia s LogBook záznamami",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Späť na hub
      </Link>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
          <Wrench className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Continuous Maintenance Management
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Systém riadenia kontinuálnej údržby a technických procesov pre EAMG.
          Modul je momentálne vo vývoji.
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Modul vo vývoji
            </h2>
            <p className="text-slate-600">
              CMM modul je momentálne v príprave. Plánované spustenie je v ďalšej
              fáze vývoja PetuniaLAB platformy.
            </p>
          </div>
        </div>
      </div>

      {/* Planned Features */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" />
          Plánované funkcie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plannedFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <span className="text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
