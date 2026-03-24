import { auth } from "@/lib/auth";
import { HubHeader } from "@/components/HubHeader";

export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <HubHeader userName={session?.user?.name} />
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-900 text-slate-500 text-center py-4 text-sm border-t border-slate-800">
        PetuniaLAB &mdash; EAMG Development Environment
      </footer>
    </div>
  );
}
