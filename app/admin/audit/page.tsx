'use client';
import { useEffect, useState } from 'react';
type Item = { id:string, actor:string, action:string, target?:string, meta?:string, createdAt:string };

export default function AuditPage(){
  const [rows,setRows] = useState<Item[]>([]);
  useEffect(()=>{ (async()=>{ const r = await fetch('/api/admin/audit'); setRows(await r.json()); })(); },[]);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Audit Log</h1>
      <p className="text-white/70 mt-1">Last 200 admin actions.</p>
      <div className="mt-3 overflow-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-white/60"><th className="text-left p-2">Time</th><th className="text-left p-2">Actor</th><th className="text-left p-2">Action</th><th className="text-left p-2">Target</th><th className="text-left p-2">Meta</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-2">{r.actor}</td>
                <td className="p-2">{r.action}</td>
                <td className="p-2">{r.target||''}</td>
                <td className="p-2"><code className="text-xs">{r.meta||''}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
