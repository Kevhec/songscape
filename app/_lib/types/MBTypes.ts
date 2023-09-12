/* MB Types */

interface MBSearchArtist {
  id: string
  name: string
  score: number
}

type MBRelation = {
  type: string
  url?: {
    resource: string
  }
};

interface MBLookupArtist {
  id: string
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

export type {
  MBSearchArtist,
  MBRelation,
  MBLookupArtist,
};
