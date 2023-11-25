import { NextResponse } from 'next/server';

export default function errorHandler(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}
