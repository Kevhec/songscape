import React from 'react';
import Slider from '@/components/Slider';
import type { ChartArtist } from '@/types';
import ArtistCard from '../cards/artist/ArtistCard';

export default async function TopArtists() {
  let artistsList: ChartArtist[];

  try {
    const response = await fetch('http://localhost:3000/api/chart/', {
      headers: {
        method: 'artist',
      },
    });

    artistsList = await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }

  return (
    <Slider
      elements={
        artistsList.map((artist) => <ArtistCard artist={artist} />)
      }
    />
  );
}
