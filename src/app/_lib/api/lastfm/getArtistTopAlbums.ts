import { LFMArtistTopAlbums } from '../../types';
import generateRandomId from '../generateRandomId';
import getFromLFM from './getFromLFM';

interface Params {
  artistName: string
  limit?: string | null
}

async function getArtistTopAlbums({ artistName, limit }: Params): Promise<LFMArtistTopAlbums | {}> {
  try {
    // Get 25 top artists list from lastfm and return them
    const topAlbums = await getFromLFM({
      params: ['artistAlbums', { artistName, limit: limit || 3 }],
    });

    return {
      ...topAlbums,
      id: generateRandomId(),
    } || {};
  } catch (error: any) {
    console.error(`[server]: Error in getArtistTopAlbums: ${error.message}`);
    return {};
  }
}

export default getArtistTopAlbums;
