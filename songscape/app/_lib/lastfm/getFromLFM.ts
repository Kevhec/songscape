const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

type Method = 'topArtists' | 'artistInfo' | 'artistName' | 'limit' ;

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
  artistInfo: 'method=artist.getinfo',
  artistName: 'artist=',
  limit: 'limit=',
};

async function getFromLFM({ params, values }: Params) {
  let requestParams;
  if (typeof params === 'string') {
    requestParams = paramToValueMap[params];
  } else {
    requestParams = params.map((method) => {
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

  const url = `${BASE_URL}?${requestParams}&api_key=${process.env.LFM_KEY}&format=json`;
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error: any) {
    return {
      status: 404,
      message: error.message,
    };
  }
}

export default getFromLFM;
