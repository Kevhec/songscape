import type {
  NoValueMethod, Params, ValueMethod,
} from './getFromLFM';

type ParamToValueMap = {
  [key in NoValueMethod | ValueMethod]: string;
};

const paramToValueMap: ParamToValueMap = {
  topArtists: 'method=chart.gettopartists',
  topTracks: 'method=chart.gettoptracks',
  topTags: 'method=chart.gettoptags',
  artistInfo: 'method=artist.getinfo',
  artistAlbums: 'method=artist.gettopalbums',
  artistName: 'artist=',
  limit: 'limit=',
};

function parseParams({ params }: Params) {
  const parseParamWithValue = (paramName: ValueMethod, paramValue: any) => (
    paramToValueMap[paramName].concat(`${encodeURI(paramValue)}`)
  );

  let parsedParams = '';

  parsedParams = params.map((param) => {
    // Handle no value param, it is provided as a string
    if (typeof param === 'string') {
      return paramToValueMap[param];
    }

    // Handle valued params, they are provided as key value objects
    const valuedParams = Object.keys(param) as ValueMethod[];
    const parsedValuedParams = valuedParams.map((valuedParam) => {
      const paramValue = param[valuedParam];
      return parseParamWithValue(valuedParam, paramValue);
    }).join('&');

    return parsedValuedParams;
  }).join('&');

  return parsedParams;
}

export default parseParams;
