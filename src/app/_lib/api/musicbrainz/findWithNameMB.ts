import { MB_BASE_URL, MB_USERAGENT } from '@lib/constants';
import RateLimiter from '@lib/utils/rateLimiter';
import { MBSearchArtist } from '@types';

const rateLimiter = RateLimiter.getInstance();

export default async function searchByName(artistName: string):Promise<MBSearchArtist[]> {
  try {
    // Format artist name to fit on url standards
    const fmtName = artistName.replace(' ', '%20').trim();

    // Call musicbrainz api to look for best match for provided name
    const searchResult: { artists: MBSearchArtist[] } = await rateLimiter.fetchRequest({
      url: `${MB_BASE_URL}/artist/?query=artist:${fmtName}&limit=10&fmt=json`,
      options: {
        headers: MB_USERAGENT,
        cache: 'force-cache',
      },
    });

    const artistsList = searchResult?.artists;

    if (!artistsList) {
      return [];
    }

    return artistsList;
  } catch (error: any) {
    return [];
  }
}
