import { MB_BASE_URL } from '../../constants';
import { MBRecordingResult } from '../../types';
import RateLimiter from '../../utils/rateLimiter';
import getCoverArt from './getCoverArt';

const ratelimiter = RateLimiter.getInstance();

export async function searchRecording({ name, artist }: { name: string, artist?: string }) {
  try {
    const songName = encodeURIComponent(name?.replace('?', '') || '');
    const url = `${MB_BASE_URL}/recording/?query=recording%3A"${songName}"%20AND%20status:official&limit=5&fmt=json&inc=releases`;

    const response: MBRecordingResult = await ratelimiter.fetchRequest({ url });

    const bestMatchs = response.recordings.filter((recording) => {
      const scoreContribution = recording.score > 98;
      const artistContribution = (
        artist !== undefined
          ? recording['artist-credit'][0].name === artist
          : true
      );
    });

    let coverArtData = null;

    for (let i = 0; i < bestMatchs.length; i += 1) {
      const currentRecording = bestMatchs[i];
      const currentReleases = currentRecording.releases;

      for (let j = 0; j < currentRecording.releases.length; j += 1) {
        const currentRelease = currentReleases[j];
        // eslint-disable-next-line no-await-in-loop
        const coverArtResponse = await getCoverArt({ mbid: currentRelease.id });

        if (coverArtResponse.status !== 404) {
          // eslint-disable-next-line no-await-in-loop
          coverArtData = await coverArtResponse.json();
          break;
        }
      }

      if (coverArtData !== null) break;
    }

    return selectedRecording || {};
  } catch (error) {
    return {};
  }
}
