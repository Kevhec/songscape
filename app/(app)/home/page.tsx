import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import icon25 from '@/public/25.svg';
import Slider from '@/components/Slider';
import ArtistCard from '@/components/cards/ArtistCard';
import Icon from '@/components/icon';
import Tags from '@/components/tags/Tags';
import { lato } from '@/fonts';

export type LFMTag = {
  name: string
  url: string
};
interface ChartArtist {
  name: string
  mbid: number
  location: string
  tags: LFMTag[]
  picture: string
}

export default async function Page() {
  let response;
  try {
    response = await fetch('http://localhost:3000/api/chart/', {
      headers: {
        method: 'artist',
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
  const artistsList: ChartArtist[] = await response?.json();

  const cards = artistsList.map((artist) => {
    const {
      name, location, picture, tags, mbid,
    } = artist;

    return (
      <ArtistCard>
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
          <Tags tags={tags} />
        </div>
      </ArtistCard>
    );
  });

  return (
    <>
      <div className="home-heading">
        <Image src={icon25} alt="25" />
        <h1>Artists that made history</h1>
      </div>
      <Slider elements={cards} />
    </>
  );
}
