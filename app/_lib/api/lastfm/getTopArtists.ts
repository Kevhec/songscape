import type { LFMArtist, LFMArtistChart } from '@/types';
import getFromLFM from './getFromLFM';

export default async function getTopArtists(): Promise<LFMArtist[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const artistChart: LFMArtistChart = await getFromLFM({
      params: ['topArtists', 'limit'],
      values: { limit: 25 },
    });

    const artistsList: LFMArtist[] = artistChart?.artists?.artist;
    return artistsList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
