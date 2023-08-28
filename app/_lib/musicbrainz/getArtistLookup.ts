import RateLimiter from '../rateLimiter';
import { MBRelation } from './findWithNameMB';

export interface MBLookupArtist {
  id: number
  name: string
  relations: MBRelation[]
  gender: string
  'life-span': {
    ended: boolean
    begin: string
    end: string
  }
  area: {
    name: string
  }
}

const rateLimiter = RateLimiter.getInstance();

async function getArtistLookup(mbid: number): Promise<MBLookupArtist> {
  try {
    const json: MBLookupArtist = await rateLimiter.fetchRequest(`https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`);

    return json;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default getArtistLookup;
