/* LFM Types */

interface LFMTrack {
  name: string
  duration: number
  playcount: number
  listeners: number
  mbid: number
  artist: {
    name: string
    mbid: number
    url: string
  }
}

type LFMTag = {
  name: string
  url: string
  id: `${string}-${string}-${string}-${string}-${string}`
};

interface LFMArtist {
  name: string
  playcount: number
  listeners: number
  mbid: number
  tags?: {
    tag: LFMTag[]
  }
}

interface LFMArtistChart {
  artists: {
    artist: LFMArtist[]
  }
}

interface ChartArtist {
  name: string
  mbid: number
  location: string
  tags?: LFMTag[]
  picture?: string
}

export type {
  LFMTrack,
  LFMArtist,
  LFMTag,
  LFMArtistChart,
  ChartArtist,
};
