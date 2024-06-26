import type { ChartArtist } from '@lib/types/LFMTypes';
import getTopArtists from '../lastfm/getTopArtists';
import getArtistInfo from '../lastfm/getArtistInfo';
import getArtistPicture from '../musicbrainz/getArtistPicture';
import getArtistLookup from '../musicbrainz/getArtistLookup';
import generateRandomId from '../generateRandomId';
import searchByName from '../musicbrainz/findWithNameMB';

export default async function getArtistChart(): Promise<ChartArtist[]> {
  try {
    // Get top artists list
    const topArtists = await getTopArtists();

    // Modify provided artists with aditional information provided by musicbrainz
    const artistsChart = await Promise.all(topArtists.map(async (LFMChartArtist) => {
      const result: ChartArtist = {
        name: '',
        location: '',
        mbid: '',
        tags: [],
        picture: '',
      };

      // Get LFM artist data
      const LFMArtist = await getArtistInfo(LFMChartArtist.name);

      if (!LFMArtist?.mbid) {
        const MBSearchResults = await searchByName(LFMChartArtist.name);
        const bestMatch = MBSearchResults?.find((artist) => artist.name === LFMChartArtist.name);

        result.mbid = bestMatch?.id || '';
      } else {
        result.mbid = LFMArtist.mbid;
      }

      // Get detaild info of artist from MB
      const MBArtist = await getArtistLookup(result.mbid);

      result.name = LFMArtist?.name || '';
      result.location = MBArtist?.area?.name || '';
      result.tags = LFMArtist?.tags?.tag.map((tag) => ({ ...tag, id: generateRandomId() }));
      result.picture = getArtistPicture(MBArtist.relations);

      return result;
    }));

    return artistsChart;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
