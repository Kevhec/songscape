import getTopArtists, { LFMTag } from '../getTopArtists';
import findWithNameMB from '../../musicbrainz/findWithNameMB';
import getArtistInfo from '../getArtistInfo';
import getArtistPicture from '../../musicbrainz/getArtistPicture';

interface ChartArtist {
  name: string
  mbid: number
  location: string
  tags: LFMTag[] | undefined
  picture: string
}

export default async function getArtistChart(): Promise<ChartArtist[]> {
  try {
    // Get top artists list
    const topArtists = await getTopArtists();

    // Modify provided artists with aditional information provided by musicbrainz
    const artistsChart = await Promise.all(topArtists.map(async (LFMChartArtist) => {
      // Get musicbrain's and lastFM artist data
      const MBArtist = await findWithNameMB(LFMChartArtist.name);
      const LFMArtist = await getArtistInfo(LFMChartArtist.name);

      const result: ChartArtist = {
        name: LFMArtist.name,
        mbid: LFMArtist.mbid || MBArtist.id,
        location: MBArtist.area.name,
        tags: LFMArtist.tags?.tag,
        picture: getArtistPicture(MBArtist.relations),
      };

      return result;
    }));

    return artistsChart;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
