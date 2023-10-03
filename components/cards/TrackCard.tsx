import React from 'react';
import { LFMTrack } from '@/app/_lib/types';

interface Props {
  track: LFMTrack;
}

export default function TrackCard({ track }: Props) {
  const {
    artist, duration, listeners, name, playcount,
  } = track;

  return (
    <div>
      <p>{`Artist: ${artist.name}`}</p>
      <p>{`Name: ${name}`}</p>
      <p>{`Duration: ${duration}`}</p>
      <p>{`Listeners: ${listeners}`}</p>
      <p>{`Playcount: ${playcount}`}</p>
    </div>
  );
}
