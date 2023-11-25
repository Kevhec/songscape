import React from 'react';
import fetchChartDataClient from '@/app/_lib/client/fetchChartData';
import Heading from '../Heading';
import TrackCard from '../cards/TrackCard';

export default async function TopTracks() {
  const tracksList = await fetchChartDataClient({ type: 'tracks' });

  return (
    <div className="home__section home__section--top-tracks">
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
