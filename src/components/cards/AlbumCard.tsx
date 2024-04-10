import React from 'react';
import Image from 'next/image';
import type { LFMAlbum } from '@lib/types';
import { montserrat } from '@fonts';
import cn from 'classnames';

interface Props {
  album: LFMAlbum
  textOverImage?: boolean
}

export default function AlbumCard({ album, textOverImage }: Props) {
  const imageSrc = album?.image?.find((img) => img.size === 'extralarge')?.['#text'];
  const containerClasses = cn('albumCard', { 'albumCard--textOverImage': textOverImage });

  return (
    <div className={containerClasses}>
      <figure className="albumCard__figure">
        <Image
          width={150}
          height={150}
          src={imageSrc || ''}
          alt={`Cover of ${album?.name || ''}`}
          className="albumCard__image"
        />
      </figure>
      <div className={`albumCard__content ${montserrat.variable}`}>
        <p className="albumCard__albumName">{album?.name || ''}</p>
        <p className="albumCard__albumArtist">{album?.artist?.name || ''}</p>
      </div>
    </div>
  );
}
