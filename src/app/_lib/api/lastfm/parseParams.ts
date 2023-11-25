import type {
  NoValueMethod, Params, ValueMethod,
} from './getFromLFM';

type ParamToValueMap = {
  [key in NoValueMethod | ValueMethod]: string;
};

const paramToValueMap: ParamToValueMap = {
  topArtists: 'method=chart.gettopartists',
  topTracks: 'method=chart.gettoptracks',
  artistInfo: 'method=artist.getinfo',
  artistName: 'artist=',
  limit: 'limit=',
};

function parseParams({ params }: Params) {
  const parseParamWithValue = (paramName: ValueMethod, paramValue: any) => (
    paramToValueMap[paramName].concat(`${paramValue}`)
  );

  let parsedParams = '';

  parsedParams = params.map((param) => {
    // Handle no value param, it is provided as a string
    if (typeof param === 'string') {
      return paramToValueMap[param];
    }

    // Handle valued params, they are provided as key value objects
    const paramName = Object.keys(param)[0] as ValueMethod;

    const paramValue = param[paramName];
    return parseParamWithValue(paramName, paramValue);
  }).join('&');

  return parsedParams;
}

export default parseParams;
