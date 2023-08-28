import delay from './delay';

class RateLimiter {
  private static instance: RateLimiter;

  private cache: { [url: string]: boolean } = {};

  private queue = Promise.resolve();

  private lastRequestTime: number = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }

    return RateLimiter.instance;
  }

  public reset() {
    this.queue = Promise.resolve();
    this.lastRequestTime = 0;
  }

  public async fetchRequest(url: string) {
    if (this.cache[url]) {
      // Request is cached, no need for rate limiting
      const response = await fetch(url);
      return response.json();
    }

    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    const delayTime = Math.max(0, 1050 - timeSinceLastRequest);
    this.lastRequestTime = now + delayTime;

    const jsonResponse = await this.queue.then(async () => {
      await delay(delayTime);
      const response = await fetch(url);
      this.cache[url] = true;
      return response.json();
    });

    return jsonResponse;
  }
}

export default RateLimiter;
