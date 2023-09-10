import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import getArtistChart from '@/lib/api/charts/getArtistChart';

export async function GET() {
  const headerList = headers();
  const method = headerList.get('method');
  let data;

  try {
    switch (method) {
      case 'artist':
        data = await getArtistChart();
        break;
      case 'tracks':
        console.log('Tracks chart');
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
