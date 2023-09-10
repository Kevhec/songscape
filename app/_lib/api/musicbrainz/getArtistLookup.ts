import type { MBLookupArtist } from '@/types';
import { MB_BASE_URL, MB_USERAGENT } from '@/lib/constants';
import RateLimiter from '@/lib/utils/rateLimiter';

const rateLimiter = RateLimiter.getInstance();

async function getArtistLookup(mbid: number): Promise<MBLookupArtist> {
  try {
    const json: MBLookupArtist = await rateLimiter.fetchRequest({
      url: `${MB_BASE_URL}/artist/${mbid}?inc=url-rels&fmt=json`,
      options: {
        headers: MB_USERAGENT,
      },
    });

    return json;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default getArtistLookup;
