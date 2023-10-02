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
}

interface LFMArtistChart {
  artists: {
    artist: LFMArtist[]
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
}

export type {
  LFMArtist,
  LFMTag,
  LFMArtistChart,
  ChartArtist,
  LFMTrack,
};
