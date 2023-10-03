import React from 'react';
import getChartClient from '@/lib/client/getChart';
import type { LFMTrack } from '@/app/_lib/types';
import Heading from '../Heading';
import TrackCard from '../cards/TrackCard';

export default async function TopTracks() {
  const tracksList: LFMTrack[] = await getChartClient({ method: 'tracks' });

  return (
    <div className="top-artists">
      <Heading variant="h2" icon="number-25">
        All time favorites
      </Heading>
      {
        tracksList.map((track) => (
          <TrackCard track={track} key={track.id} />
        ))
      }
    </div>
  );
}
