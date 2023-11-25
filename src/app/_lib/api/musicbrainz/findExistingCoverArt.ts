import { CoverArtArchiveImages, CoverArtArchiveResponse, MBRecording } from '../../types';
import getCoverArt from './getCoverArt';

export default async function getExistingCoverArt(
  { recordings }: { recordings: MBRecording[] },
): Promise<CoverArtArchiveImages | undefined> {
  let existingCoverArt: CoverArtArchiveImages = {
    image: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
  };

  try {
    // Loop through existing recordings
    for (let i = 0; i < recordings.length; i += 1) {
      const currentRecording = recordings[i];

      if (!currentRecording) break;
      const currentReleases = currentRecording.releases;

      // Loop through recording releases
      for (let j = 0; j < currentRecording.releases.length; j += 1) {
        const currentRelease = currentReleases[j];

        // Call Cover Art Archive API to check if the current Id has an associated art
        // eslint-disable-next-line no-await-in-loop
        const coverArtResponse = await getCoverArt({ mbid: currentRelease.id });
        if (coverArtResponse.ok) {
          // eslint-disable-next-line no-await-in-loop
          const coverArtJSON = await coverArtResponse.json() as CoverArtArchiveResponse;
          const [foundCoverArt] = coverArtJSON.images;
          existingCoverArt = foundCoverArt;
          // Premature break if a cover art is found
          break;
        }
      }

      // If there is a cover art break the outer loop.
      if (Object.keys(existingCoverArt).length > 0) break;
    }

    return existingCoverArt;
  } catch (error: any) {
    return existingCoverArt;
  }
}
