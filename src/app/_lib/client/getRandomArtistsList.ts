import { LFMArtistChart } from '@types';
import { HOSTNAME } from '../constants';

async function getRandomArtistsListClient(): Promise<LFMArtistChart> {
  try {
    const response = await fetch(`${HOSTNAME}/api/artist/getRandom`, { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return [] as unknown as LFMArtistChart;
  }
}

export default getRandomArtistsListClient;
