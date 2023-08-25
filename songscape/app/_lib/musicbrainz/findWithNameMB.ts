export interface MBSearchArtist {
  id: number
  name: string
}

export type MBRelation = {
  type: string
  url?: {
    resource: string
  }
};

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

export default async function findWithNameMB(artistName: string): Promise<MBLookupArtist> {
  try {
    // Format artist name to fit on url standards
    const fmtName = artistName.replace(' ', '%20');
    const url = `http://musicbrainz.org/ws/2/artist/?query=artist:${fmtName}&limit=10&fmt=json`;

    // Call musicbrainz api to look for best match for provided name
    const searchRes = await fetch(url, {
      headers: {
        'User-Agent': 'songscape/1.0 (kevhec.dev@gmail.com)',
      },
    });
    const { artists: searchResults }: { artists: MBSearchArtist[] } = await searchRes.json();

    // Get id from best artist match
    const targetArtistId = searchResults.find((artist) => artist.name === artistName)?.id;

    // Call music brainz lookups to get detailed information about the artist and return it
    const lookupRes = await fetch(`https://musicbrainz.org/ws/2/artist/${targetArtistId}?inc=url-rels&fmt=json`, {
      headers: {
        'User-Agent': 'songscape/1.0 (kevhec.dev@gmail.com)',
      },
    });
    const targetArtistMB: MBLookupArtist = await lookupRes.json();
    return targetArtistMB;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
