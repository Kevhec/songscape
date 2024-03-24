import type { LFMArtist } from '@/types';
import getFromLFM from './getFromLFM';

interface Params {
  page?: string | null;
  limit?: string | null;
}

export default async function getTopArtists({ page, limit }: Params): Promise<LFMArtist[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const artistChart = await getFromLFM({
      params: ['topArtists', { limit: limit || 25, page }],
    });

    const artistsList: LFMArtist[] = artistChart?.artists?.artist || [];
    return artistsList;
  } catch (error: any) {
    console.error(`[server]: Error in getTopArtists: ${error.message}`);
    return [];
  }
}
