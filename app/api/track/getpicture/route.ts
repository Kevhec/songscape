import { NextResponse } from 'next/server';
import { getBestRecordings } from '@/app/_lib/api/musicbrainz/getBestRecordings';
import getExistingCoverArt from '@/app/_lib/api/musicbrainz/findExistingCoverArt';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get route search params
  const name = searchParams.get('name');
  const artist = searchParams.get('artist');

  const recordings = await getBestRecordings({ name, artist });

  const coverArtObject = await getExistingCoverArt({ recordings });

  return NextResponse.json(coverArtObject, {
    status: 200,
  });
}
