/* LFM Types */
type LFMTag = {
  name: string
  url: string
  id: `${string}-${string}-${string}-${string}-${string}`
};

interface LFMArtist {
  name: string
  playcount: number
  listeners: number
  mbid: string
  tags?: {
    tag: LFMTag[]
  }
  id: string;
}

interface LFMArtistChart {
  artists: {
    artist: LFMArtist[]
    '@attr': {
      page: string
      perPage: string
      totalPages: string
      total: string
    }
  }
}

interface LFMTrackChart {
  tracks: {
    track: LFMTrack[]
  }
}

interface LFMTagChart {
  tags: {
    tag: LFMTag[]
  }
}

interface ChartArtist {
  name: string
  mbid: string
  location: string
  tags?: LFMTag[]
  picture?: string
}

interface LFMTrack {
  name: string
  duration: number
  playcount: number
  listeners: number
  mbid?: string
  url: string
  artist: {
    name: string
    mbid?: string
    url: string
  }
  id: string;
}

interface LFMArtistTopAlbums {
  topalbums: LFMTopAlbums;
  id: string
}

interface LFMTopAlbums {
  album: LFMAlbum[];
  '@attr': LFMAttr;
}

interface LFMAttr {
  artist: string;
  page: string;
  perPage: string;
  totalPages: string;
  total: string;
}

interface LFMAlbum {
  name: string;
  playcount: number;
  mbid?: string;
  url: string;
  artist: LFMAlbumArtistClass;
  image: LFMImage[];
}

interface LFMAlbumArtistClass {
  name: string;
  mbid: string;
  url: string;
}

interface LFMImage {
  '#text': string;
  size: LFMImageSize;
}

enum LFMImageSize {
  Extralarge = 'extralarge',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export type {
  LFMArtist,
  LFMTag,
  LFMArtistChart,
  ChartArtist,
  LFMTrack,
  LFMTrackChart,
  LFMTagChart,
  LFMAlbum,
  LFMAlbumArtistClass,
  LFMArtistTopAlbums,
  LFMAttr,
  LFMImage,
  LFMImageSize,
  LFMTopAlbums,
};
