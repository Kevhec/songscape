import md5 from 'md5';
import { P18, WikiData } from '../../types';

const P18_BASE_URL = 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&sites=enwiki&props=claims&titles=';
const IMAGE_BASE_URL = 'https://upload.wikimedia.org/wikipedia/commons';

async function getP18(entity: string): Promise<P18[] | ''> {
  try {
    const response = await fetch(P18_BASE_URL + encodeURIComponent(entity));
    const json = await response.json() as WikiData;

    const { entities } = json;
    // This key is dynamic on the api, i'm getting it using Object prototype
    // So I should not worry about it's value
    const key = Object.keys(entities)[0];

    const data = entities[key];

    const { claims } = data;

    return claims.P18;
  } catch (error: any) {
    return '';
  }
}

function getWikimediaImageURL(fileName: string) {
  // Api requires this element to replace every whitespace with underscores
  const formattedFileName = fileName.replaceAll(' ', '_');

  // Api builds with the first and second characters of the md5 encoded formattedFileName
  // value
  const md5Hash = md5(formattedFileName);

  // Extracting the first two values from the md5Hash to build the url
  const [a, b] = [md5Hash[0], md5Hash[1]];

  const imageURL = `${IMAGE_BASE_URL}/${a}/${a}${b}/${formattedFileName}`;

  return imageURL;
}

export default async function getArtistPicture(artistName: string):Promise<string> {
  const possibleKeywords = [' (musician)', ' (South Korean band)', 'ゲーム会社', '(rapper)', ''];
  // Find image relation
  try {
    const promises = [];

    for (let i = 0; i < possibleKeywords.length; i += 1) {
      const keyword = possibleKeywords[i];
      promises.push(getP18(`${artistName}${keyword}`));
    }

    const responses = await Promise.all(promises);
    const existingResponse = responses.find((el) => el);

    if (!existingResponse) return '';

    const imageFileName = existingResponse[0].mainsnak.datavalue.value;

    const imageURL = getWikimediaImageURL(imageFileName);

    return imageURL;
  } catch (error) {
    return '';
  }
}
