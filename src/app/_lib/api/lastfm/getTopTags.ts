import type { LFMTag } from '@/types';
import getFromLFM from './getFromLFM';

export default async function getTopTags(): Promise<LFMTag[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const tagsChart = await getFromLFM({
      params: ['topTags', { limit: 7 }],
    });

    const tagsList: LFMTag[] = tagsChart?.tags?.tag || [];
    return tagsList;
  } catch (error: any) {
    console.error(`[server]: Error in getTopTags: ${error.message}`);
    return [];
  }
}
