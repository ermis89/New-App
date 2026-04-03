import { NextResponse } from 'next/server';
import { errorResponse } from '@/lib/api/errors';

export async function GET() {
  try {
    return NextResponse.json({ status: 'ok', service: 'web', phase: 0 }, { status: 200 });
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Health check failed.', 500);
  }
}
