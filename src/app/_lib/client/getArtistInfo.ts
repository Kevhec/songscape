import type { ChartArtist, LFMArtist } from '@types';
import { HOSTNAME } from '../constants';

export default async function getArtistInfoClient(artist: LFMArtist) {
  let id: string | null = artist.mbid || null;
  if (!artist) {
    throw new Error('It seems that there was an error looking for your artist :(');
  }

  // Fill mbid if missing
  if (!artist.mbid) {
    try {
      const response = await fetch(`${HOSTNAME}/api/artist/getid/?artistname=${artist.name}`);
      const { artistId } = await response.json();
      id = artistId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get artist data
  try {
    const response = await fetch(`${HOSTNAME}/api/artist/?id=${id}&artistname=${artist.name}`);
    return await response.json() as { artist: ChartArtist };
  } catch (error: any) {
    throw new Error(`Error looking for your artist :( ${error.message}`);
  }
}
