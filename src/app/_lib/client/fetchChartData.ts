import { HOSTNAME } from '../constants';
import { LFMArtist, LFMTag, LFMTrack } from '../types';

interface Params {
  type: 'artists' | 'tracks' | 'tags'
}

type ChartDataTypes = LFMArtist[] | LFMTrack[] | LFMTag[];

async function fetchChartDataClient({ type }: { type: 'artists' }): Promise<LFMArtist[]>;
async function fetchChartDataClient({ type }: { type: 'tracks' }): Promise<LFMTrack[]>;
async function fetchChartDataClient({ type }: { type: 'tags' }): Promise<LFMTag[]>;
async function fetchChartDataClient<T extends ChartDataTypes>({ type }: Params): Promise<T> {
  try {
    const response = await fetch(`${HOSTNAME}/api/chart/?type=${type}`);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    return [] as unknown as T;
  }
}

export default fetchChartDataClient;
