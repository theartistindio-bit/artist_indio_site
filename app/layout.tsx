import './styles.css';
import Link from 'next/link';
import ClientHeader from './ui/ClientHeader';

export const metadata = { title: 'The Artist Indio' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="h-14 flex items-center gap-4 px-4 border-b border-white/10">
          <Link className="font-semibold" href="/">The Artist Indio</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link className="nav-link" href="/gallery">Gallery</Link>
            <Link className="nav-link" href="/music">Music</Link>
            <Link className="nav-link" href="/merch">Merch</Link>
            <Link className="nav-link" href="/admin/analytics">Analytics</Link>
            <Link className="nav-link" href="/admin/audit">Audit Log</Link>
            <Link className="nav-link" href="/checkout">Checkout</Link>
            <Link className="nav-link" href="/signin">Sign in</Link>
          </nav>
          <ClientHeader />
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
