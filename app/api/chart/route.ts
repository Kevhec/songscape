import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface MBSearchArtist {
  id: number
  name: string
  area: {
    name: string
  }
}

interface LFMArtist {
  name: string
  playcount: number
  listeners: number
  mbid: number
}

interface LFMArtistChart {
  artists: {
    artist: LFMArtist[]
  }
}

async function findWithNameMB(artistName: string) {
  const fmtName = artistName.replace(' ', '%20');
  try {
    const searchRes = await fetch(`http://musicbrainz.org/ws/2/artist/?query=artist:${fmtName}&limit=10&fmt=json`, {
      headers: {
        'User-Agent': 'songscape/1.0 (kevhec.dev@gmail.com)',
      },
    });
    const { artists: searchResults }: { artists: MBSearchArtist[] } = await searchRes.json();

    const targetArtistId = searchResults.find((artist) => artist.name === artistName)?.id;

    const lookupRes = await fetch(`https://musicbrainz.org/ws/2/artist/${targetArtistId}?inc=url-rels&fmt=json`)
    const targetArtistMB = await lookupRes.json()

    return targetArtistMB;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function getArtistsListLFM() {
  try {
    const res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=25&api_key=${process.env.LFM_KEY}&format=json`);

    const { artists: { artist: artistsList } }: LFMArtistChart = await res.json();

    return artistsList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function getArtistChart() {
  try {
    const artistsList = await getArtistsListLFM();
    const completeArtistList = artistsList.map(async (artist) => {
      const { name, mbid, listeners, playcount } = artist;
      const MBArtist = await findWithNameMB(name);

      return {
        name,
        mbid: mbid || MBArtist.id,
      }

    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

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
