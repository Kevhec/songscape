import { NextResponse } from 'next/server';
import searchByName from '@/lib/api/musicbrainz/findWithNameMB';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const artistName = searchParams.get('artistname');

  try {
    if (artistName) {
      let response;

      const MBSearchResults = await searchByName(artistName);
      const bestMatch = MBSearchResults?.find((artist) => (
        artist.name === artistName || artist.score === 100
      ));

      if (bestMatch?.id) {
        response = bestMatch.id;
      } else {
        response = 'not found';
      }

      return NextResponse.json({ artistId: response });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
