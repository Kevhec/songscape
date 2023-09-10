import delay from './delay';

interface FetchRequest {
  url: string,
  options?: RequestInit
}

// Singleton class to queue requests on musicbrainz api to respect 1req per second limit

class RateLimiter {
  private static instance: RateLimiter;

  // Cache object to disable throtting on already fetched requests, needs to have a
  // response caching system for it to work properly, on this case NextJS caching system
  private cache: { [url: string]: boolean } = {};

  // Queue for requests using promise.resolve funtion
  private queue = Promise.resolve();

  // Variable to keep track of time passed since last request to have a reference point
  // for the minimum time needed for the request to be done
  private lastRequestTime: number = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // Method to handle singleton behavior
  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }

    return RateLimiter.instance;
  }

  // Method to reset queue when necessary
  public reset() {
    this.queue = Promise.resolve();
    this.lastRequestTime = 0;
  }

  // Method to handle fetch requests using queue and throthing
  public async fetchRequest({ url, options }: FetchRequest) {
    // Skip queue if request is already in cache
    try {
      if (this.cache[url]) {
        // Request is cached, no need for rate limiting
        const response = await fetch(url, options);
        return await response.json();
      }

      // Get current time and extract last request time to check how much time has passed
      // Since last request and calc delay time in consecuence
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      const delayTime = Math.max(0, 1050 - timeSinceLastRequest);
      this.lastRequestTime = now + delayTime;

      // Apply calculated delay and place response on cache
      const jsonResponse = await this.queue.then(async () => {
        await delay(delayTime);
        const response = await fetch(url, options);
        this.cache[url] = true;
        return response.json();
      });

      return jsonResponse;
    } catch (error: any) {
      throw new Error(`[rateLimiter]: Error fetching resource from ${url}, details: ${error.message}`);
    }
  }
}

export default RateLimiter;
