import type { LFMArtist } from '@/types';
import getFromLFM from './getFromLFM';

export default async function getArtistInfo(artistName: string) {
  try {
    const { artist }: { artist: LFMArtist } = await getFromLFM({
      params: ['artistInfo', 'artistName'],
      values: {
        artistName,
      },
    });

    return artist;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
