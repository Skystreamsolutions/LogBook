import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface AppCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  stats?: { label: string; value: string | number }[];
  status?: "active" | "coming-soon" | "development";
}

const statusConfig = {
  active: {
    label: "Aktívne",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  "coming-soon": {
    label: "Pripravuje sa",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  development: {
    label: "Vo vývoji",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
};

export function AppCard({
  title,
  description,
  href,
  icon: Icon,
  color,
  stats,
  status = "active",
}: AppCardProps) {
  const statusInfo = statusConfig[status];
  const isDisabled = status === "coming-soon";

  const content = (
    <div
      className={`group relative bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-300 ${
        isDisabled
          ? "opacity-70 cursor-not-allowed"
          : "hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-slate-300"
      }`}
    >
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusInfo.className}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Icon */}
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-4">{description}</p>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="flex gap-4 pt-4 border-t border-slate-100">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-lg font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hover arrow */}
      {!isDisabled && (
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-6 h-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      )}
    </div>
  );

  if (isDisabled) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
