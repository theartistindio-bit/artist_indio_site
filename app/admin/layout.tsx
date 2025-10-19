import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getRoleServer } from '@/lib/auth';
import CsrfInjector from './csrf-injector';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const role = await getRoleServer();
  if (role !== 'OWNER' && role !== 'ADMIN') redirect('/signin');
  return <><CsrfInjector />{children}</>;
}
