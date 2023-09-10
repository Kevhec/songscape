import { NextResponse } from 'next/server';

export default function errorHandler(error: Error) {
  if (error instanceof SyntaxError) {
    // Unexpected token < in JSON
    return NextResponse.json(
      { message: 'There was a syntax error', error },
      { status: 400 },
    );
  }
}
