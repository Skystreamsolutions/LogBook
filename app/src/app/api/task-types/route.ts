import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const taskTypes = await prisma.taskType.findMany({
    orderBy: { code: "asc" },
    include: { _count: { select: { entries: true } } },
  });
  return NextResponse.json(taskTypes);
}
