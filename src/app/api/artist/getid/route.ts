import { NextResponse } from 'next/server';
import searchByName from '@lib/api/musicbrainz/findWithNameMB';
import errorHandler from '@lib/api/errorHandler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const artistName = searchParams.get('artistname');

  try {
    if (artistName) {
      const MBSearchResults = await searchByName(artistName);

      if (!MBSearchResults) {
        return errorHandler(
          `No results for artist search ${artistName}`,
          404,
        );
      }

      const bestMatch = MBSearchResults?.find((artist) => (
        artist.name === artistName || artist.score === 100
      ));

      const response = bestMatch?.id || '';

      return NextResponse.json({ artistId: response });
    }
  } catch (error: any) {
    console.error(`[server]: Error handling request for artist ${artistName}, Network Error: ${error.message}`);
    return errorHandler(
      process.env.NODE_ENV === 'production'
        ? 'An error ocurred while processing the request.'
        : `Error handling request for artist ${artistName}, Network Error: ${error.message}`,
      500,
    );
  }
}
