import { cookies, headers } from 'next/headers';
import crypto from 'crypto';

export function getOrSetCsrf() {
  const store = cookies();
  let token = store.get('csrf-token')?.value;
  if (!token) {
    token = crypto.randomBytes(16).toString('hex');
    store.set('csrf-token', token, { httpOnly: false, path: '/', sameSite: 'lax' });
  }
  return token;
}

export function assertCsrf() {
  const store = cookies();
  const token = store.get('csrf-token')?.value;
  const hdr = headers().get('x-csrf-token');
  if (!token || !hdr || token !== hdr) {
    throw new Error('Invalid CSRF token');
  }
}
