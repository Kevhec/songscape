import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/icon';
import { LFMArtist } from '@/types';
import getArtistInfoClient from '@/lib/client/getArtistInfo';
import { lato } from '@/styles/fonts';
import Tags from '@/components/tags/Tags';
import FavoriteButton from '@/components/FavoriteButton';

interface Props {
  artist: LFMArtist
}

export default async function ArtistCardContent({ artist }: Props) {
  const response = await getArtistInfoClient(artist);

  const { artist: artistInfo } = response;

  return (
    <div className="artist-card">
      <div className="artist-card__header">
        <FavoriteButton />
        <Link href={`/results/artist/${artistInfo.name}?id=${artistInfo.mbid}`} className="artist-card__link">
          <Image
            src={artistInfo.picture || 'http://placekitten.com/200/300'}
            alt={`Picture of ${artistInfo.name}`}
            width={170}
            height={170}
            className="artist-card__image"
          />
          <p className="artist-card__name">{artistInfo.name}</p>
        </Link>
      </div>
      <div className="artist-card__body">
        <div className={`artist-card__location ${lato.variable}`}>
          <Icon variant="location" fill="#212529" width={22} />
          <p className="artist-card__location-text">{artistInfo.location}</p>
        </div>
        { artistInfo.tags && <Tags tags={artistInfo.tags} /> }
      </div>
    </div>
  );
}
