'use client';
import { useEffect, useState } from 'react';
type Me = { role: string, email?: string, image?: string };

export default function ClientHeader(){
  const [me, setMe] = useState<Me|null>(null);
  const [open, setOpen] = useState(false);
  useEffect(()=>{ fetch('/api/me').then(r=>r.json()).then(setMe).catch(()=>{}); },[]);
  if (!me || me.role==='VISITOR') return null;
  return (
    <div className="ml-auto relative flex items-center gap-3 pr-4">
      <button onClick={()=>setOpen(o=>!o)} className="flex items-center gap-2">
        {me.image ? <img src={me.image} alt="avatar" className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-white/10" />}
        <span className="text-sm text-white/70 hidden sm:inline">{me.email||me.role}</span>
        <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
      </button>
      {open && (
        <div className="absolute right-4 top-10 w-48 rounded-xl bg-black/80 backdrop-blur border border-white/10 shadow-lg">
          <a className="block px-3 py-2 hover:bg-white/10 text-sm" href="/profile">Profile</a>
          <a className="block px-3 py-2 hover:bg-white/10 text-sm" href="/admin">Admin</a>
          <a className="block px-3 py-2 hover:bg-white/10 text-sm" href="/api/auth/signout">Sign out</a>
        </div>
      )}
    </div>
  );
}
