import errorHandler from '@/app/_lib/api/errorHandler';
import getArtistTopAlbums from '@/app/_lib/api/lastfm/getArtistTopAlbums';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistName = searchParams.get('artistname');

  if (!artistName) {
    return NextResponse.json({
      message: `No album data is available for artist ${artistName}`,
    }, {
      status: 404,
    });
  }

  try {
    const artistAlbums = await getArtistTopAlbums(artistName);

    return NextResponse.json(artistAlbums, {
      status: 200,
    });
  } catch (error) {
    return errorHandler('Error getting artist albums data', 500);
  }
}
