import { HOSTNAME } from '../constants';
import { LFMArtist } from '../types';

export default async function getArtistChartClient(): Promise<LFMArtist[]> {
  try {
    const response = await fetch(`${HOSTNAME}/api/chart/`, {
      headers: {
        method: 'artists',
      },
      cache: 'force-cache',
    });

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
