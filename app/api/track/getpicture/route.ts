import { NextResponse } from 'next/server';
import { searchRecording } from '@/app/_lib/api/musicbrainz/searchRecording';
import { CoverArtArchiveImages } from '@/app/_lib/types';
import getCoverArt from '@/app/_lib/api/musicbrainz/getCoverArt';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get route search params
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const artist = searchParams.get('artist');

  const recording = await searchRecording({ id, name, artist });

  const pictures: CoverArtArchiveImages | {} = await getCoverArt({ mbid: recording?.releases[0].id });

  return NextResponse.json(pictures, {
    status: 200,
  });
}
