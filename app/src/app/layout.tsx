import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aircraft Maintenance LogBook",
  description: "Aircraft Maintenance Engineer Experience LogBook - Patrik Gonda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <nav className="bg-slate-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="text-xl font-bold">AME LogBook</span>
                </div>
                <div className="flex gap-1">
                  <a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
                    Dashboard
                  </a>
                  <a href="/logbook" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
                    Logbook
                  </a>
                  <a href="/aircraft" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
                    Lietadlá
                  </a>
                  <a href="/licences" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
                    Licencie
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {children}
          </main>
          <footer className="bg-slate-800 text-slate-400 text-center py-4 text-sm">
            Aircraft Maintenance Engineer Experience &mdash; Patrik Gonda
          </footer>
        </div>
      </body>
    </html>
  );
}
