import type { LFMTag } from '@types';
import getFromLFM from './getFromLFM';

interface Params {
  page?: string | null;
  limit?: string | null;
}

export default async function getTopTags({ page, limit }: Params): Promise<LFMTag[]> {
  try {
    // Get 25 top artists list from lastfm and return them
    const tagsChart = await getFromLFM({
      params: ['topTags', { limit: limit || 7, page }],
    });

    const tagsList: LFMTag[] = tagsChart?.tags?.tag || [];
    return tagsList;
  } catch (error: any) {
    console.error(`[server]: Error in getTopTags: ${error.message}`);
    return [];
  }
}
