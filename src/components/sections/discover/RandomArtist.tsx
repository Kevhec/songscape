import { LFMArtistChart } from '@/app/_lib/types';
import RandomArtistCard from '@/components/cards/artist/RandomArtist';
import Slider from '@/components/Slider';
import SliderProvider from '@/contexts/SliderContext';
import React from 'react';

interface Props {
  artistsList: LFMArtistChart
}

export default function RandomArtist({ artistsList }: Props) {
  return (
    <SliderProvider>
      <div className="discover__randomArtists">
        <Slider
          sliderIdentifier="discoverartist"
          elements={
              artistsList.artists.artist.map((artist) => (
                <RandomArtistCard artist={artist} />
              ))
            }
          pagination
          type="fade"
          rewind
          autoplay
          interval={5000}
          pauseOnHover
        />
      </div>
    </SliderProvider>
  );
}
