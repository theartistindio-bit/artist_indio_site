export const metadata = { title: 'Sign in — The Artist Indio' };

export default function SignInPage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',background:'#000'}}>
      <div style={{padding:24,borderRadius:12,background:'rgba(255,255,255,0.1)'}}>
        <h1 style={{margin:0,marginBottom:12}}>Sign in to The Artist Indio</h1>
        <p style={{margin:'8px 0 16px',opacity:.8}}>
          Use your Google account to sign in. If your email matches <code>OWNER_EMAIL</code>,
          you’ll unlock admin access.
        </p>
        <a
          href="/api/auth/signin"
          style={{display:'inline-block',padding:'10px 14px',background:'#2563eb',borderRadius:8,color:'#fff',textDecoration:'none'}}
        >
          Continue with Google
        </a>
      </div>
    </div>
  );
}
 default function SignInPage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',background:'#000'}}>
      <div style={{padding:24,borderRadius:12,background:'rgba(255,255,255,0.1)'}}>
        <h1 style={{margin:0,marginBottom:12}}>Sign in</h1>
        <a href="/api/auth/signin" style={{display:'inline-block',padding:'10px 14px',background:'#2563eb',borderRadius:8,color:'#fff',textDecoration:'none'}}>Continue with Google</a>
      </div>
    </div>
  );
}
 const metadata = { title: 'Sign in — The Artist Indio' };
export default function SignInPage(){
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <p className="text-white/70 mt-2">Use Google to sign in as Owner/Admin. (No passwords to manage.)</p>
      <a href="/api/auth/signin" className="mt-6 inline-block px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20">Continue with Google</a>
      <p className="text-xs text-white/50 mt-4">If your email matches <code>OWNER_EMAIL</code>, you&apos;ll be recognized as <b>OWNER</b>.</p>
    </div>
  );
}
