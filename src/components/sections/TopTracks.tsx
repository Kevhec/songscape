import React from 'react';
import fetchChartDataClient from '@lib/client/fetchChartData';
import Heading from '../Heading';
import TrackCard from '../cards/TrackCard';

export default async function TopTracks() {
  const tracksList = await fetchChartDataClient({ type: 'tracks' });

  return (
    <>
      <Heading variant="h2" icon="number-25">
        All time favorites
      </Heading>
      {
        tracksList.map((track) => (
          <TrackCard track={track} key={track.id} />
        ))
      }
    </>
  );
}
