import { NextResponse } from 'next/server';
import getTopArtists from '@lib/api/lastfm/getTopArtists';
import type { LFMArtist, LFMTag, LFMTrack } from '@lib/types';
import getTopTracks from '@lib/api/lastfm/getTopTracks';
import generateRandomId from '@lib/api/generateRandomId';
import errorHandler from '@lib/api/errorHandler';
import getTopTags from '@lib/api/lastfm/getTopTags';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  let data: LFMArtist[] | LFMTrack[] | LFMTag[] = [];

  try {
    switch (type) {
      case 'artists':
        data = await getTopArtists({ page, limit });
        break;
      case 'tracks':
        data = await getTopTracks({ page, limit });
        break;
      case 'tags':
        data = await getTopTags({ page, limit });
        break;
      default:
        console.error(`[server]: Chart type "${type}" does not exists`);
        return NextResponse.json(
          { message: `type "${type}" does not exists` },
          { status: 400 },
        );
    }

    // If data exists return it successfully
    if (data) {
      const dataWithId = data.map((el) => (
        {
          ...el,
          id: generateRandomId(),
        }
      ));
      return NextResponse.json([...dataWithId], {
        status: 200,
      });
    }

    // If no data is received return error
    return errorHandler(`No data available for type: ${type}`, 404);
  } catch (error: any) {
    console.error(`[server]: Error handling request for type ${type}: ${error.message}`);
    return errorHandler(
      process.env.NODE_ENV === 'production'
        ? 'An error ocurred while processing the request.'
        : `Error handling request for type ${type}: ${error.message}`,
      500,
    );
  }
}
