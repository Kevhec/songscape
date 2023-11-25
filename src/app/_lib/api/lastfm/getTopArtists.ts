import type { LFMArtist } from '@/types';
import getFromLFM from './getFromLFM';

export default async function getTopArtists(): Promise<LFMArtist[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const artistChart = await getFromLFM({
      params: ['topArtists', { limit: 25 }],
    });

    const artistsList: LFMArtist[] = artistChart?.artists?.artist || [];
    return artistsList;
  } catch (error: any) {
    console.error(`[server]: Error in getTopArtists: ${error.message}`);
    return [];
  }
}
