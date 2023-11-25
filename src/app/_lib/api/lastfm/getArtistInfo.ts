import getFromLFM from './getFromLFM';

export default async function getArtistInfo(artistName: string) {
  try {
    const artist = await getFromLFM({
      params: ['artistInfo', { artistName }],
    });

    if (!artist) return undefined;

    const artistData = artist.artist;
    return artistData;
  } catch (error: any) {
    console.error(`[server]: Error in getArtistInfo: ${error.message}`);
    return undefined;
  }
}
