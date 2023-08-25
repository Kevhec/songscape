import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import getArtistChart from '@/lib/lastfm/charts/getArtistChart';

export async function GET() {
  const headerList = headers();
  const method = headerList.get('method');
  let data;

  switch (method) {
    case 'artist':
      data = await getArtistChart();
      break;
    default:
      throw new Error(`Method "${method}" does not exists`);
  }

  return NextResponse.json([...data]);
}
