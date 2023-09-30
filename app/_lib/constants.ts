const HOSTNAME = process.env.HOST || 'http://localhost:3000';
const LFM_BASE_URL = 'http://ws.audioscrobbler.com/2.0';
const LFM_API_KEY = process.env.LFM_KEY;
const MB_BASE_URL = 'https://musicbrainz.org/ws/2';
const MB_USERAGENT = { 'User-Agent': 'songscape/1.0.0 (kevhec.dev@gmail.com)' };

export {
  HOSTNAME,
  LFM_BASE_URL,
  LFM_API_KEY,
  MB_BASE_URL,
  MB_USERAGENT,
};
