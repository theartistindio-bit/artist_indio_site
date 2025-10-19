'use client';
import { useEffect, useRef, useState } from 'react';

type Row = { name: string, streams?: number, downloads?: number, revenue?: number };
type SalesDay = { day: string, revenue: number };

function drawBar(canvas: HTMLCanvasElement | null, labels: string[], values: number[]) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const w = canvas.width, h = canvas.height, pad = 30;
  ctx.clearRect(0,0,w,h);
  const max = Math.max(1, ...values);
  const bw = (w - pad*2) / Math.max(1, values.length);
  ctx.strokeStyle = '#ffffff33'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h-pad); ctx.lineTo(w-pad, h-pad); ctx.stroke();
  values.forEach((v,i)=>{
    const x = pad + i*bw + bw*0.1; const y = h - pad - (v/max)*(h - pad*2); const barH = h - pad - y;
    ctx.fillStyle = '#8B5CF6'; ctx.fillRect(x, y, bw*0.8, barH);
    ctx.fillStyle = '#ffffffaa'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(String(v), x + bw*0.4, y - 4);
    ctx.save(); ctx.translate(x + bw*0.4, h - pad + 14); ctx.rotate(-Math.PI/6); ctx.fillText(labels[i]?.slice(0,12)||'', 0, 0); ctx.restore();
  });
}

export default function Analytics() {
  const streamsRef = useRef<HTMLCanvasElement|null>(null);
  const downloadsRef = useRef<HTMLCanvasElement|null>(null);
  const salesRef = useRef<HTMLCanvasElement|null>(null);
  const revenueRef = useRef<HTMLCanvasElement|null>(null);
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    // Demo data for now
    const labels = ['Persona A','Persona B','Persona C'];
    const vals = [120,80,44];
    drawBar(streamsRef.current, labels, vals);
    drawBar(downloadsRef.current, labels, [12,8,3]);
    drawBar(salesRef.current, labels, [199, 990, 349]);
    setReady(true);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Analytics (Owner-only)</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="p-3 card"><h3 className="font-semibold mb-2">Streams by Persona</h3><canvas ref={streamsRef} width={400} height={240} /></div>
        <div className="p-3 card"><h3 className="font-semibold mb-2">Downloads by Persona</h3><canvas ref={downloadsRef} width={400} height={240} /></div>
        <div className="p-3 card"><h3 className="font-semibold mb-2">Sales by Persona</h3><canvas ref={salesRef} width={400} height={240} /></div>
      </div>
      <div className="p-3 card mt-4"><h3 className="font-semibold mb-2">Revenue by Day</h3><canvas ref={revenueRef} width={900} height={280} /></div>
    </div>
  );
}
