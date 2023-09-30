import { NextResponse } from 'next/server';
import generateRandomId from '@/lib/api/generateRandomId';
import getArtistPicture from '@/lib/api/musicbrainz/getArtistPicture';
import getArtistInfo from '@/lib/api/lastfm/getArtistInfo';
import getArtistLookup from '@/lib/api/musicbrainz/getArtistLookup';
import type { ChartArtist } from '@/types';

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
      throw new Error('Artist name is required and has not been provided');
    }

    if (!artistId) {
      throw new Error('Artist id is required and has not been provided');
    }

    result.mbid = artistId;

    const LFMArtist = await getArtistInfo(artistName);
    const MBArtist = await getArtistLookup(result.mbid);

    result.name = LFMArtist.name || 'Not found';
    result.location = MBArtist?.area?.name || 'Not found';
    result.tags = LFMArtist.tags?.tag.map((tag) => ({ ...tag, id: generateRandomId() })) || [];
    result.picture = getArtistPicture(MBArtist.relations) || '';

    return NextResponse.json({ artist: result });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
