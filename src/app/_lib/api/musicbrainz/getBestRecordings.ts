import { MB_BASE_URL, MB_USERAGENT } from '../../constants';
import { MBRecordingResult } from '../../types';
import RateLimiter from '../../utils/rateLimiter';

const ratelimiter = RateLimiter.getInstance();

export async function getBestRecordings(
  { name, artist }: { name: string | null, artist: string | null },
) {
  try {
    const songName = encodeURIComponent(name?.replace('?', '') || '');

    const url = `${MB_BASE_URL}/recording/?query=recording%3A"${songName}"%20AND%20artist:${artist}%20AND%20status:official&limit=5&fmt=json&inc=releases`;

    const response: MBRecordingResult = await ratelimiter.fetchRequest({
      url,
      options: {
        headers: MB_USERAGENT,
        cache: 'force-cache',
      },
    });

    return response.recordings || [];
  } catch (error) {
    return [];
  }
}
