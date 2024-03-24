import React from 'react';
import Image from 'next/image';
import type { LFMAlbum } from '@/app/_lib/types';
import { montserrat } from '@/styles/fonts';

interface Props {
  album: LFMAlbum
}

export default function AlbumCard({ album }: Props) {
  const imageSrc = album.image.find((img) => img.size === 'medium')?.['#text'];
  return (
    <div className="albumCard">
      <figure className="albumCard__image">
        <Image
          width={150}
          height={150}
          src={imageSrc || ''}
          alt={`Cover of ${album.name}`}
        />
      </figure>
      <div className={`albumCard__content ${montserrat.variable}`}>
        <p className="albumCard__albumName">{album.name}</p>
        <p className="albumCard__albumArtist">{album.artist.name}</p>
      </div>
    </div>
  );
}
