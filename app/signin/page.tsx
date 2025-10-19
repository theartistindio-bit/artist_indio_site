export const metadata = { title: 'Sign in — The Artist Indio' };
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
