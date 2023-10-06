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

  const response = await fetch(`${HOSTNAME}/api/track/getpicture/?name=${name}&artist=${artist.name}`);
  const images: CoverArtArchiveImages = await response.json();

  /* console.log({
    name,
    images: images.image,
    thumbs: images.thumbnails,
  }); */

  const imageSRC = images.thumbnails && images.thumbnails.small !== ''
    ? (images?.thumbnails.small || images.image)
    : images?.image;

  const formatName = (artistName: string) => artistName.replace('-', ' ');

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
        <p className="track__paragraph">{`Artist: ${formatName(artist.name)}`}</p>
        <p className="track__paragraph">{`Name: ${formatName(name)}`}</p>
      </div>
      <div className="track__play-info">
        <p>{`${duration}`}</p>
      </div>
    </div>
  );
}
