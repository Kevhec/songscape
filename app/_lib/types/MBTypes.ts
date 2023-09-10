/* MB Types */

interface MBSearchArtist {
  id: number
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

export type {
  MBSearchArtist,
  MBRelation,
  MBLookupArtist,
};
