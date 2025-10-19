'use client';
import { useEffect, useState } from 'react';
declare global { interface Window { paypal: any } }

export default function PayPalButton({ totalCents, description, songId, merchId }:{ totalCents:number, description:string, songId?:string, merchId?:string }){
  const [clientId, setClientId] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(()=>{
    (async()=>{
      const cfg = await fetch('/api/public/paypal').then(r=>r.json());
      setClientId(cfg.clientId||''); setCurrency(cfg.currency||'USD');
      if (!document.querySelector('#paypal-sdk')) {
        const s = document.createElement('script');
        s.id = 'paypal-sdk';
        s.src = `https://www.paypal.com/sdk/js?client-id=${cfg.clientId}&currency=${cfg.currency}`;
        s.async = true;
        document.body.appendChild(s);
      }
    })();
  },[]);

  useEffect(()=>{
    const timer = setInterval(()=>{
      if (window.paypal && document.getElementById('paypal-buttons')) {
        clearInterval(timer);
        window.paypal.Buttons({
          createOrder: async () => {
            const res = await fetch('/api/paypal/create-order', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ totalCents, description })});
            const j = await res.json();
            return j.id;
          },
          onApprove: async (data:any) => {
            const res = await fetch('/api/paypal/capture-order', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ orderId: data.orderID, email, phone, songId, merchId, totalCents })});
            const j = await res.json();
            if (j.ok && j.link) { alert('Payment complete! A download link was sent to your email.'); window.location.href = j.link; }
            else if (j.ok) { alert('Payment complete!'); }
            else { alert(j.error||'There was an issue capturing payment.'); }
          }
        }).render('#paypal-buttons');
      }
    }, 300);
    return ()=>clearInterval(timer);
  }, [clientId, currency, totalCents, description, email, phone, songId, merchId]);

  return (
    <div className="p-3 card">
      <div className="grid gap-2">
        <input className="p-2 rounded bg-white/10" placeholder="Your email (required)" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="p-2 rounded bg-white/10" placeholder="Phone (optional)" value={phone} onChange={e=>setPhone(e.target.value)} />
      </div>
      <div id="paypal-buttons" className="mt-3"></div>
    </div>
  );
}
