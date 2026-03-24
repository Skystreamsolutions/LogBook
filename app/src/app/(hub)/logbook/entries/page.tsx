import { prisma } from "@/lib/prisma";
import LogbookClient from "../LogbookClient";

export const dynamic = "force-dynamic";

export default async function LogbookEntriesPage() {
  const [aircraft, taskTypes, licenceCategories] = await Promise.all([
    prisma.aircraft.findMany({ orderBy: { registration: "asc" } }),
    prisma.taskType.findMany({ orderBy: { code: "asc" } }),
    prisma.licenceCategory.findMany({ orderBy: { code: "asc" } }),
  ]);

  return (
    <LogbookClient
      aircraft={aircraft}
      taskTypes={taskTypes}
      licenceCategories={licenceCategories}
    />
  );
}
