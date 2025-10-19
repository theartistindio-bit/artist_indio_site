import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getRoleFromSession(_req: NextRequest): Promise<string> {
  try {
    const session: any = await getServerSession(authOptions as any);
    return session?.role || 'VISITOR';
  } catch { return 'VISITOR'; }
}

export async function getRoleServer(): Promise<string> {
  try {
    const session: any = await getServerSession(authOptions as any);
    return session?.role || 'VISITOR';
  } catch { return 'VISITOR'; }
}
