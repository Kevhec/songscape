import { LFM_API_KEY, LFM_BASE_URL } from '@/lib/constants';
import parseParams from './parseParams';
import type {
  LFMArtist, LFMArtistChart, LFMTrack, LFMTrackChart,
} from '../../types';

export type ValueMethod = 'artistName' | 'limit';
export type NoValueMethod = 'topArtists' | 'topTracks' | 'artistInfo';
export interface Params {
  params: (NoValueMethod | { [key in ValueMethod]?: any })[];
}

export type ParamsWithObject<T extends ValueMethod> = {
  [key in T]?: any;
};

type TopArtistsParamsType = Params & {
  params: ['topArtists'] | ['topArtists', Partial<ParamsWithObject<'limit'>>];
};
type TopTracksParamsType = Params & {
  params: ['topTracks'] | ['topTracks', Partial<ParamsWithObject<'limit'>>];
};
type ArtistInfoParamsType = Params & {
  params: ['artistInfo'] | ['artistInfo', Partial<ParamsWithObject<'artistName'>>];
};

type LastFMAPIResponse = LFMArtist[] | LFMTrack[] | LFMArtistChart | LFMArtist;

async function getFromLFM(params: TopArtistsParamsType): Promise<LFMArtistChart>;
async function getFromLFM(params: TopTracksParamsType): Promise<LFMTrackChart>;
async function getFromLFM(params: ArtistInfoParamsType): Promise<{ artist: LFMArtist }>;
async function getFromLFM<T extends LastFMAPIResponse>(params: Params): Promise<T> {
  const requestParams = parseParams(params);

  const url = `${LFM_BASE_URL}/?${requestParams}&api_key=${LFM_API_KEY}&format=json`;
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error while getting data from LastFM. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error(`[server]: Error in getFromLFM: ${error.message}`);

    throw new Error(`Error while trying to connect to LastFM. Details: ${error.message}`);
  }
}

export default getFromLFM;
