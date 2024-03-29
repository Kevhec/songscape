import getRandomArtistsList from '@lib/api/lastfm/getRandomArtistList';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const randomArtistsListFromLFM = await getRandomArtistsList();

    if (!randomArtistsListFromLFM) {
      return NextResponse.json({
        message: "Couldn't get random artists data",
      }, {
        status: 500,
      });
    }

    return NextResponse.json({ ...randomArtistsListFromLFM });
  } catch (error) {
    console.error('Something went wrong');
    return NextResponse.json({
      message: "Couldn't get random artists data",
    }, {
      status: 500,
    });
  }
}
