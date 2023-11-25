import { NextResponse } from 'next/server';
import { getBestRecordings } from '@/app/_lib/api/musicbrainz/getBestRecordings';
import getExistingCoverArt from '@/app/_lib/api/musicbrainz/findExistingCoverArt';
import errorHandler from '@/app/_lib/api/errorHandler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get route search params
  const name = searchParams.get('name');
  const artist = searchParams.get('artist');

  try {
    const recordings = await getBestRecordings({ name, artist });
    const coverArtObject = await getExistingCoverArt({ recordings });

    if (!recordings) {
      return errorHandler(
        `Recording asociated to the name ${name} and artist ${artist} could not be found`,
        404,
      );
    }

    if (!coverArtObject) {
      return errorHandler(
        `No cover art found for element ${name} of the artist ${artist}`,
        404,
      );
    }

    return NextResponse.json(coverArtObject, {
      status: 200,
    });
  } catch (error: any) {
    console.error(`[server] Error retrieving cover art for ${name} - ${artist}. Network error: ${error.message}`);
    return errorHandler(
      process.env.NODE_ENV === 'production'
        ? 'An error ocurred while processing the request.'
        : `Error retrieving cover art for ${name} - ${artist}. Network error: ${error.message}`,
      500,
    );
  }
}
