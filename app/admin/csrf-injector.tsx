'use client';
import { useEffect } from 'react';
export default function CsrfInjector(){
  useEffect(()=>{
    const t = document.cookie.split('; ').find(x=>x.startsWith('csrf-token='))?.split('=')[1];
    const orig = window.fetch;
    window.fetch = (input: any, init: any = {}) => {
      init.headers = init.headers || {};
      (init.headers as any)['X-CSRF-Token'] = t || '';
      return orig(input, init);
    };
  },[]);
  return null;
}
