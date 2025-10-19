export const metadata = { title: 'Sign in — The Artist Indio' };

export default function SignInPage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',background:'#000'}}>
      <div style={{padding:24,borderRadius:12,background:'rgba(255,255,255,0.1)'}}>
        <h1 style={{margin:0,marginBottom:12}}>Sign in to The Artist Indio</h1>
        <p style={{margin:'8px 0 16px',opacity:.8}}>
          Use your Google account. If your email matches <code>OWNER_EMAIL</code>, you’ll unlock admin access.
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
