import RateLimiter from '../rateLimiter';

export interface MBSearchArtist {
  id: number
  name: string
  score: number
}

export type MBRelation = {
  type: string
  url?: {
    resource: string
  }
};

const rateLimiter = RateLimiter.getInstance();

export default async function searchByName(artistName: string):Promise<MBSearchArtist[]> {
  try {
    // Format artist name to fit on url standards
    const fmtName = artistName.replace(' ', '%20').trim();

    // Call musicbrainz api to look for best match for provided name
    const searchRes = await rateLimiter.fetchRequest(`https://musicbrainz.org/ws/2/artist/?query=artist:${fmtName}&limit=10&fmt=json`);
    const { artists: searchResults }: { artists: MBSearchArtist[] } = searchRes;

    return searchResults;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
