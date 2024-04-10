import { COVER_ART_ARCHIVE_BASEURL } from '../../constants';

export default async function getCoverArt({ mbid }: { mbid: string }) {
  try {
    const reqURL = new URL(`/release/${mbid}`, COVER_ART_ARCHIVE_BASEURL);
    console.log({ reqURL });

    const response = await fetch(reqURL);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
