import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from '@/components/slider';
import Card from '@/components/card';

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
  const res = await fetch('http://localhost:3000/api/chart/', {
    headers: {
      method: 'artist',
    },
  });
  /* const artistsList: ChartArtist[] = await res.json(); */
  console.log(res)

  /* const cards = artistsList.map((artist) => {
    const { name, location, picture } = artist;
    return (
      <Card>
        <Image src={picture} alt={`Picture of ${name}`} />
        <Link href={`/results/artist/${name}`}>{name}</Link>
        <p>{location}</p>
      </Card>
    );
  }); */

  return (
    <>
      <h1>Hello, Home page!</h1>
{/*       <Slider elements={cards} /> */}
    </>
  );
}
