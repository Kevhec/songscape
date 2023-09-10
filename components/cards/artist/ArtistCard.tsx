import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/icon';
import Tags from '@/components/tags/Tags';
import { lato } from '@/styles/fonts';
import type { ChartArtist } from '@/types';

interface Props {
  artist: ChartArtist
}

export default function ArtistCard({ artist }: Props) {
  const {
    mbid, name, picture, location, tags,
  } = artist;

  return (
    <div className="artist-card">
      <Link href={`/results/artist/${name}?id=${mbid}`} className="artist-card__link">
        <Image
          src={picture || 'http://placekitten.com/200/300'}
          alt={`Picture of ${name}`}
          width={170}
          height={170}
          className="artist-card__image"
        />
        <p className="artist-card__name">{name}</p>
      </Link>
      <div className="artist-card__body">
        <div className={`artist-card__location ${lato.variable}`}>
          <Icon variant="location" fill="#212529" width={22} />
          <p className="artist-card__location-text">{location}</p>
        </div>
        { tags && <Tags tags={tags} /> }
      </div>
    </div>
  );
}
