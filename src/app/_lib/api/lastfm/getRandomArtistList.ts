import getRandomInt from '@lib/utils/getRandomInt';
import type { LFMArtistChart } from '@types';
import getFromLFM from './getFromLFM';

// Cache to store the last pages requested to ensure they are not repeated
// in at least 24 hours
const pageCache: Number[] = [];

// Maximum number provided by LastFM for a page param, after this the resulting
// array containing the artists data is empty
const MAX_PAGES = 1999;
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
const MAX_PAGES_IN_CACHE = process.env.NODE_ENV === 'development'
  ? 2
  : 10;

const developmentRevalidateTime = 5000;
// Minimum time to allow a new request out of cache
const timeForNewRequest = process.env.NODE_ENV === 'development'
  ? developmentRevalidateTime
  : MILLISECONDS_IN_A_DAY;

let lastCallTimeStamp = 0;
let isFirstRequest = true;
let lastRequestedPage: Number;

// True if the has passed enough time since last request according to timeForNewRequest
function isRequestReady(): Boolean {
  const currentTime = Date.now();
  const timeSinceLastRequest = currentTime - lastCallTimeStamp;
  return timeSinceLastRequest >= timeForNewRequest;
}

async function getRandomArtistsList(): Promise<LFMArtistChart | null> {
  let randomPage;

  // Initialize state for server start up
  if (isFirstRequest) {
    randomPage = 1;
  }

  if (isRequestReady()) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // Get a random number until it is not in the cache to ensure unique new pages
      // following the criteria of no repeating calls in at least 10 days for each previous page
      randomPage = getRandomInt({ min: 1, max: MAX_PAGES });

      // LFM Has an error that retrieves 1000 artists pages that end with 0,
      // to avoid that 1 will be added whenever this is detected
      if (randomPage % 10 === 0) {
        randomPage += 1;
      }

      if (!pageCache.includes(randomPage)) break;
    }
  } else {
    // Maintain previous page if a new different request is not ready
    randomPage = lastRequestedPage;
  }

  // Remove a page from the cache if the exclusion time has passed, which is related
  // to the maximum elements that can be in the cache array
  if (pageCache.length > MAX_PAGES_IN_CACHE) {
    pageCache.shift();
  }

  try {
    // Get artist list from LFM revalidating according to the time set before
    // as the params does not change until the request is possible
    // next should cache the response avoiding unnecessary calls until revalidation
    // is posible
    const list = await getFromLFM(
      {
        params: ['topArtists', { limit: 5, page: randomPage }],
      },
      {
        next: {
          revalidate: timeForNewRequest,
        },
      },
    );

    // Update state
    isFirstRequest = false;
    lastRequestedPage = parseInt(list.artists['@attr'].page, 10);
    lastCallTimeStamp = Date.now();

    // Add new page to cache if it's different to the previous page requested
    if (!pageCache.includes(lastRequestedPage)) {
      pageCache.push(lastRequestedPage);
    }

    return list;
  } catch (error: any) {
    console.error(`[server]: Error in getRandomArtistList: ${error.message}`);
    return null;
  }
}

export default getRandomArtistsList;
