import React from 'react';
import Link from 'next/link';
import Slider from '@/components/slider';
import Card from '@/components/card';

export default async function Page() {
  const res = await fetch('http://localhost:3000/api/chart/', {
    headers: {
      method: 'artist',
    },
  });
  const artistsList = await res.json();

  const cards = artistsList.map((artist) => {
    const { name } = artist;
    return (
      <Card>
        <Link href={`/results/artist/${name}`}>{name}</Link>
      </Card>
    );
  });

  return (
    <>
      <h1>Hello, Home page!</h1>
      <Slider elements={cards} />
    </>
  );
}
