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

type MBArtistAlias = {
  'sort-name': string | null
  'type-id': string | null
  name: string | null
  locale: string | null
  type: string | null
  primary: boolean | null
  'begin-date': string | null
  'end-date': string | null
};

type MBArtistCredit = {
  name: string
  artist: {
    id: string
    name: string
    'sort-name': string
    aliases: MBArtistAlias[]
  }
};

type MBReleaseGroup = {
  id: string
  'type-id': string
  'primary-type-id': string
  title: string
  'primary-type': string
};

type MBRecordingIncRelease = {
  id: string
  title: string
  status: string
  disambiguation: string
};

type MBRecording = {
  id: string
  score: number
  title: string
  length: number
  video: boolean
  'artist-credit': MBArtistCredit[]
  releases: MBRecordingIncRelease[]
  isrcs: Array<string>
};

interface MBRecordingResult {
  created: string
  count: number
  offset: number
  recordings: MBRecording[]
}

type CoverArtArchiveThumbnails = {
  250: string
  500: string
  1200: string
  large: string
  small: string
};

interface CoverArtArchiveImages {
  image: string
  thumbnails: CoverArtArchiveThumbnails
}

interface CoverArtArchiveResult {
  images: CoverArtArchiveImages[]
  release: string
}

export type {
  MBSearchArtist,
  MBRelation,
  MBLookupArtist,
  MBArtistAlias,
  MBArtistCredit,
  MBRecordingIncRelease,
  MBRecording,
  MBReleaseGroup,
  MBRecordingResult,
  CoverArtArchiveImages,
  CoverArtArchiveResult,
  CoverArtArchiveThumbnails,
};
