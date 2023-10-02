import { HOSTNAME } from '../constants';
import { LFMArtist, LFMTrack } from '../types';

interface Params {
  method: 'artists' | 'tracks'
}

async function getChartClient({ method }: Params): Promise<LFMArtist[] | LFMTrack[]> {
  try {
    const response = await fetch(`${HOSTNAME}/api/chart/?method=${method}`);

    return await response.json();
  } catch (error: any) {
    return [];
  }
}

export default getChartClient;
