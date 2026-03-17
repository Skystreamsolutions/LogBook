import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.licenceCategory.findMany({
    orderBy: { code: "asc" },
    include: { _count: { select: { entries: true } } },
  });
  return NextResponse.json(categories);
}
