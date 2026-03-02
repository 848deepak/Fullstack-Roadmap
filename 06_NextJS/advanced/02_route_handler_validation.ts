import { NextRequest, NextResponse } from 'next/server';

// Beginner: validate request body before processing.
// Advanced: stable error format makes API clients resilient and predictable.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.title !== 'string' || body.title.trim().length < 3) {
    return NextResponse.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'title must be at least 3 characters'
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      id: Date.now(),
      title: body.title.trim()
    },
    { status: 201 }
  );
}
