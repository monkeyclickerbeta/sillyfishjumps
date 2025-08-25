import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';

  // Block basic bot-like agents (if ContentKeeper uses them)
  if (userAgent.includes('ContentKeeper') || userAgent.includes('CK-WEBFILTER')) {
    return new Response('Blocked', { status: 403 });
  }

  return NextResponse.next();
}
