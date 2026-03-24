import Link from "next/link";
import { Plane, FileText, Shield, BarChart3, Home } from "lucide-react";

export default function LogbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Logbook Sub-navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-12 overflow-x-auto">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <Home className="w-4 h-4" />
              Hub
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href="/logbook"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Dashboard
            </Link>
            <Link
              href="/logbook/entries"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              Záznamy
            </Link>
            <Link
              href="/logbook/aircraft"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <Plane className="w-4 h-4" />
              Lietadlá
            </Link>
            <Link
              href="/logbook/licences"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <Shield className="w-4 h-4" />
              Licencie
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  );
}
