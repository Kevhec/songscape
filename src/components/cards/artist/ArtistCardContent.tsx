import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LFMArtist } from '@types';
import getArtistInfoClient from '@lib/client/getArtistInfo';
import FavoriteButton from '@components/FavoriteButton';

interface Props {
  artist: LFMArtist
}

export default async function ArtistCardContent({ artist }: Props) {
  const response = await getArtistInfoClient(artist);

  const { artist: artistInfo } = response;

  return (
    <article className="artist-card">
      <header className="artist-card__header">
        <FavoriteButton />
        <Link href={`/results/artist/${artistInfo.name}?id=${artistInfo.mbid}`} className="artist-card__link">
          <Image
            src={artistInfo?.picture || 'http://placekitten.com/200/300'}
            alt={`Picture of ${artistInfo.name}`}
            width={170}
            height={170}
            className="artist-card__image"
          />
        </Link>
      </header>
      <main className="artist-card__body">
        <h1 className="artist-card__name">{artistInfo.name}</h1>
      </main>
    </article>
  );
}
