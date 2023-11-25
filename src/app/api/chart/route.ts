import { NextResponse } from 'next/server';
import getTopArtists from '@/app/_lib/api/lastfm/getTopArtists';
import type { LFMArtist, LFMTrack } from '@/app/_lib/types';
import getTopTracks from '@/app/_lib/api/lastfm/getTopTracks';
import generateRandomId from '@/app/_lib/api/generateRandomId';
import errorHandler from '@/app/_lib/api/errorHandler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let data: LFMArtist[] | LFMTrack[] = [];

  try {
    switch (type) {
      case 'artists':
        data = await getTopArtists();
        break;
      case 'tracks':
        data = await getTopTracks();
        break;
      default:
        console.error(`[server]: Chart type "${type}" does not exists`);
        return NextResponse.json(
          { message: `type "${type}" does not exists` },
          { status: 400 },
        );
    }

    // If data exists return it succesfully
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

    // If no data is recieved return error
    return errorHandler(`No data available for type: ${type}`, 404);
  } catch (error: any) {
    console.error(`[server]: Error handling request for type ${type}: ${error.message}`);
    return errorHandler(
      process.env.NODE_ENV === 'production'
        ? `Error handling request for type ${type}: ${error.message}`
        : 'An error ocurred while processing the request.',
      500,
    );
  }
}
