import getTopArtists, { LFMTag } from '../getTopArtists';
import findWithNameMB from '../../musicbrainz/findWithNameMB';
import getArtistInfo from '../getArtistInfo';
import getArtistPicture from '../../musicbrainz/getArtistPicture';

interface ChartArtist {
  name: string
  mbid: number
  location: string
  tags: LFMTag[]
  picture: string
}

export default async function getArtistChart(): Promise<ChartArtist[]> {
  try {
    // Get top artists list
    const topArtists = await getTopArtists();

    // Modify provided artists with aditional information provided by musicbrainz
    const artistsChart = topArtists.map(async (LFMChartArtist) => {
      // Get musicbrain's artist data
      const MBArtist = await findWithNameMB(LFMChartArtist.name);

      // Get lastfm artist's data
      const LFMArtist = await getArtistInfo(LFMChartArtist.name);

      return {
        name: LFMArtist.name,
        mbid: LFMArtist.mbid || MBArtist.id,
        location: MBArtist.area.name,
        tags: LFMArtist.tags?.tag,
        picture: getArtistPicture(MBArtist.relations),
      } as ChartArtist;
    });

    return artistsChart;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
