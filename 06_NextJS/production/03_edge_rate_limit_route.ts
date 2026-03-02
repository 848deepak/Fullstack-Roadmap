import { NextRequest, NextResponse } from 'next/server';

// Beginner: simple in-memory limiter for learning.
// Advanced: production should use Redis/shared store to work across instances.
const requestCounters = new Map<string, { count: number; resetAt: number }>();

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 20;

  const current = requestCounters.get(ip);

  if (!current || current.resetAt < now) {
    requestCounters.set(ip, { count: 1, resetAt: now + windowMs });
    return NextResponse.json({ ok: true, remaining: maxRequests - 1 });
  }

  if (current.count >= maxRequests) {
    return NextResponse.json(
      { code: 'RATE_LIMITED', message: 'Too many requests' },
      { status: 429 }
    );
  }

  current.count += 1;
  requestCounters.set(ip, current);

  return NextResponse.json({ ok: true, remaining: maxRequests - current.count });
}
