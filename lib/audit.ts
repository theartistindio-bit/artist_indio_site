import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function audit(action: string, target?: string, meta?: any) {
  try {
    const session:any = await getServerSession(authOptions as any);
    const actor = session?.user?.email || 'system';
    await prisma.auditLog.create({ data: { actor, action, target: target||null, meta: meta ? JSON.stringify(meta) : null } });
  } catch {}
}
