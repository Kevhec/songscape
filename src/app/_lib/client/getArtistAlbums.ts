import { HOSTNAME } from '../constants';
import { LFMArtistTopAlbums } from '../types';

export default async function getArtistAlbumsClient(
  artistName: string,
  limit?: string | number,
):Promise<LFMArtistTopAlbums | boolean> {
  try {
    const response = await fetch(
      `${HOSTNAME}/api/artist/gettopalbums/?artistname=${artistName}&limit=${limit}`,
    );

    const artistAlbums = await response.json() as LFMArtistTopAlbums;

    return artistAlbums;
  } catch (error) {
    return false;
  }
}
