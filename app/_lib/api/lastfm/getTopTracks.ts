/* import type { LFMTrack } from '@/types';
import getFromLFM from './getFromLFM';

export interface LFMArtistChart {
  artists: {
    artist: LFMTrack[]
  }
}

export default async function getTopTracks(): Promise<LFMTrack[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const tracksChart: LFMTrack = await getFromLFM({
      params: ['topTracks', 'limit'],
      values: { limit: 5 },
    });

    const tracksList: =
    return artistsList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
 */
