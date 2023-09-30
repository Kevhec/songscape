import { HOSTNAME } from '../constants';
import { LFMArtist } from '../types';

interface Params {
  method: 'artists' | 'tracks'
}

export default async function getChartClient({ method }: Params): Promise<LFMArtist[]> {
  try {
    const response = await fetch(`${HOSTNAME}/api/chart/?method=${method}`);

    return await response.json();
  } catch (error: any) {
    return [];
  }
}
