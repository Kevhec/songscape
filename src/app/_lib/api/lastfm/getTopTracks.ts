import type { LFMTrack } from '@/types';
import getFromLFM from './getFromLFM';

interface Params {
  page?: string | null;
  limit?: string | null;
}

export default async function getTopTracks({ page, limit }: Params): Promise<LFMTrack[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const tracksChart = await getFromLFM({
      params: ['topTracks', { limit: limit || 5, page }],
    });

    if (!tracksChart) {
      return [];
    }

    const tracksList = tracksChart?.tracks?.track;

    return tracksList;
  } catch (error: any) {
    console.error(`[server]: Error in getTopTracks: ${error.message}`);
    return [];
  }
}
