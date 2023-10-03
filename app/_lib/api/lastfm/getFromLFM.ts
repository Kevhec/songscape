import { LFM_API_KEY, LFM_BASE_URL } from '@/lib/constants';

type Method = 'topArtists' | 'topTracks' | 'artistInfo' | 'artistName' | 'limit' ;

interface Params {
  params: Method[] | Method
  values: {
    artistName?: string
    limit?: number
  }
}

type ParamToValueMap = {
  [index in Method]: string;
};

const paramToValueMap: ParamToValueMap = {
  topArtists: 'method=chart.gettopartists',
  topTracks: 'method=chart.gettoptracks',
  artistInfo: 'method=artist.getinfo',
  artistName: 'artist=',
  limit: 'limit=',
};

const parseParams = ({ params, values }: Params) => {
  let parsedParams = '';

  if (typeof params === 'string') {
    parsedParams = paramToValueMap[params];
  } else {
    parsedParams = params.map((method) => {
      let value: string;

      switch (method) {
        case 'artistName':
          value = paramToValueMap[method] + values.artistName;
          break;
        case 'limit':
          value = paramToValueMap[method] + values.limit;
          break;
        default:
          value = paramToValueMap[method];
      }

      return value;
    }).join('&');
  }

  return parsedParams;
};

async function getFromLFM(params: Params) {
  const requestParams = parseParams(params);

  const url = `${LFM_BASE_URL}/?${requestParams}&api_key=${LFM_API_KEY}&format=json`;

  try {
    const res = await fetch(url);

    if (res.ok) {
      return await res.json();
    }

    throw new Error(
      'Something went wrong while getting data from LastFM',
      { cause: { status: res.status } },
    );
  } catch (error: any) {
    throw new Error('Error while trying to connect to lastFM', { cause: error });
  }
}

export default getFromLFM;
