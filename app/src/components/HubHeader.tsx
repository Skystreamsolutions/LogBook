"use client";

import { signOut } from "next-auth/react";
import { Beaker, LogOut, User } from "lucide-react";
import Link from "next/link";

interface HubHeaderProps {
  userName?: string | null;
}

export function HubHeader({ userName }: HubHeaderProps) {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all">
              <Beaker className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PetuniaLAB
              </span>
              <span className="hidden sm:block text-xs text-slate-400">
                EAMG Testing Hub
              </span>
            </div>
          </Link>

          {/* User menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{userName || "User"}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Odhlásiť</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
