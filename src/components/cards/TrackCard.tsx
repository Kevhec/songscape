import React from 'react';
import Image from 'next/image';
import type { CoverArtArchiveImages, LFMTrack } from '@lib/types';
import { HOSTNAME } from '@lib/constants';
import msToMinutesAndSeconds from '@lib/utils/msToMinAndS';
import formatToDuration from '@lib/utils/formatToDuration';

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
  const formatDuration = (ms: number) => {
    const minutesAndSeconds = msToMinutesAndSeconds(ms);
    return formatToDuration(minutesAndSeconds);
  };

  return (
    <article className="track track--darkbg">
      <Image
        src={imageSRC}
        alt={`Picture of ${name}`}
        width={48}
        height={48}
        className="track__image"
      />
      <div className="track__header">
        <p className="track__data track__data--songname">{formatName(name)}</p>
        <p className="track__data track__data--artist">{formatName(artist.name)}</p>
      </div>
      <div className="track__play-info">
        <p className="track__data--duration">{`${formatDuration(duration)}`}</p>
      </div>
      {/* <main className="track__body" /> */}
    </article>
  );
}
