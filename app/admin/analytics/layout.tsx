import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getRoleServer } from '@/lib/auth';

export default async function AnalyticsLayout({ children }: { children: ReactNode }) {
  const role = await getRoleServer();
  if (role !== 'OWNER') redirect('/signin');
  return <>{children}</>;
}
