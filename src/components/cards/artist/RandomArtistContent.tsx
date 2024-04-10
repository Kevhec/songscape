import React from 'react';
import getArtistInfoClient from '@lib/client/getArtistInfo';
import { LFMArtist } from '@types';
import Image from 'next/image';
import cn from 'classnames';
import Tag from '@/components/tags/Tag';

interface Props {
  artist: LFMArtist
}

async function RandomArtistContent({ artist }: Props) {
  const { artist: artistInfo } = await getArtistInfoClient(artist);

  const imageClasses = cn(
    'randomArtistCard__image',
    { 'randomArtistCard__image--nosrc': !artistInfo?.picture },
  );

  return (
    <article className="randomArtistCard">
      <figure className="randomArtistCard__figure">
        <Image
          src={artistInfo?.picture || '/logo-large.svg'}
          alt={`Image of ${artistInfo.name}`}
          width={635}
          height={374}
          className={imageClasses}
        />
      </figure>
      <div className="randomArtistCard__content">
        <h1 className="randomArtistCard__name">
          {artistInfo.name}
        </h1>
        <div className="randomArtistCard__tags">
          {artistInfo.tags?.slice(0, 3).map((tag) => (
            <Tag key={tag.id} variant="dark">
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </article>
  );
}

export default RandomArtistContent;
