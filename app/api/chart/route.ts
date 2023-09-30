import { NextResponse } from 'next/server';
import getTopArtists from '@/app/_lib/api/lastfm/getTopArtists';
import { LFMArtist } from '@/app/_lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const method = searchParams.get('method');

  let data: LFMArtist[] = [];

  try {
    switch (method) {
      case 'artists':
        data = await getTopArtists();
        break;
      case 'tracks':
        /*         console.log('Tracks chart'); */
        break;
      default:
        throw new Error(`Method "${method}" does not exists`);
    }

    // If data exists return it succesfully
    if (data) {
      return NextResponse.json([...data], {
        status: 200,
      });
    }

    // If no data is recieved from get function return error
    return NextResponse.json({ message: `Error while getting chart for method: ${method}` }, {
      status: 404,
    });
  } catch (error: any) {
    throw new Error(`[server]: Error getting required chart, details: ${error.message}`);
  }
}
