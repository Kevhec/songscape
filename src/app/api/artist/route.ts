import { NextResponse } from 'next/server';
import generateRandomId from '@lib/api/generateRandomId';
import getArtistPicture from '@lib/api/musicbrainz/getArtistPicture';
import getArtistInfo from '@lib/api/lastfm/getArtistInfo';
import getArtistLookup from '@lib/api/musicbrainz/getArtistLookup';
import errorHandler from '@lib/api/errorHandler';
import type { ChartArtist } from '@types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get('id');
  const artistName = searchParams.get('artistname');

  const result: ChartArtist = {
    name: '',
    location: '',
    mbid: '',
    tags: [],
    picture: '',
  };

  try {
    if (!artistName) {
      return errorHandler('Artist name is required', 400);
    }

    if (!artistId) {
      return errorHandler('Artist id is required', 400);
    }

    result.mbid = artistId;

    const LFMArtist = await getArtistInfo(artistName);
    const MBArtist = await getArtistLookup(result.mbid);

    result.name = LFMArtist?.name || '';
    result.location = MBArtist?.area?.name || '';
    result.tags = LFMArtist?.tags?.tag.map((tag) => (
      { ...tag, id: generateRandomId() }
    )) || [];
    result.picture = await getArtistPicture(result.name) || '';

    return NextResponse.json(
      { artist: result },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(`[server]: Error handling request for artist: ${artistName || artistId} Network Error: ${error.message}`);
    return errorHandler(
      process.env.NODE_ENV === 'production'
        ? `Error handling request for artist: ${artistName || artistId} Network Error: ${error.message}`
        : 'An error ocurred while processing the request.',
      500,
    );
  }
}
