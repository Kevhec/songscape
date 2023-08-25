import getFromLFM from './getFromLFM';

export type LFMTag = {
  name: string
  url: string
};

export interface LFMArtist {
  name: string
  playcount: number
  listeners: number
  mbid: number
  tags?: {
    tag: LFMTag[]
  }
}

export interface LFMArtistChart {
  artists: {
    artist: LFMArtist[]
  }
}

export default async function getTopArtists(): Promise<LFMArtist[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const artistChart: LFMArtistChart = await getFromLFM({ params: ['topArtists', 'limit'], values: { limit: 25 } });
    const { artists: { artist: artistsList } } = artistChart;
    return artistsList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}