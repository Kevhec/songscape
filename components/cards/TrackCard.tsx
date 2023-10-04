import React from 'react';
import Image from 'next/image';
import type { CoverArtArchiveImages, LFMTrack } from '@/app/_lib/types';
import { HOSTNAME } from '@/app/_lib/constants';

interface Props {
  track: LFMTrack;
}

export default async function TrackCard({ track }: Props) {
  const {
    artist, duration, name,
  } = track;

  const response = await fetch(`${HOSTNAME}/api/track/getpicture/?name=${name}&artist=${artist.name}`, {
    cache: 'no-cache'
  });
  const images: CoverArtArchiveImages = await response.json();

  const imageSRC = images.thumbnails ? images?.thumbnails.small : images?.image || 'http://placekitten.com/200/300';

  return (
    <div className="track">
      <Image
        src={imageSRC}
        alt={`Picture of ${name}`}
        width={170}
        height={170}
        className="track__image"
      />
      <div className="track__header">
        <p>{`Artist: ${artist.name}`}</p>
        <p>{`Name: ${name}`}</p>
      </div>
      <div className="track__play-info">
        <p>{`${duration}`}</p>
      </div>
    </div>
  );
}
