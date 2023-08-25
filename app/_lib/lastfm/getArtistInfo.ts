import getFromLFM from './getFromLFM';
import { LFMArtist } from './getTopArtists';

export default async function getArtistInfo(artistName: string) {
  try {
    const artist: LFMArtist = await getFromLFM({
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
