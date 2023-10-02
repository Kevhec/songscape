import type { LFMTrack } from '@/types';
import getFromLFM from './getFromLFM';

export default async function getTopTracks(): Promise<LFMTrack[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const tracksChart: { tracks: { track: LFMTrack[] } } = await getFromLFM({
      params: ['topTracks', 'limit'],
      values: { limit: 5 },
    });

    if (!tracksChart) {
      return [];
    }

    const tracksList = tracksChart.tracks.track;

    return tracksList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
