import React from 'react';
import getArtistAlbumsClient from '@lib/client/getArtistAlbums';
import type { LFMArtist } from '@lib/types';
import { type GridOptions } from '@splidejs/splide-extension-grid/dist/types/types/options';
import idToElement from '@/app/_lib/utils/idToElement';
import AlbumCard from '../cards/AlbumCard';
import Slider from '../Slider';

interface Props {
  artistsList: LFMArtist[]
  containerClass: string
  albumsPerArtist?: number
  createGrid?: false | GridOptions | null | undefined
  hideControls?: boolean
  hidePagination?: boolean
  hideArrows?: boolean
  isFade?: boolean
  textOverImage?: boolean
}

export default async function TopAlbums({
  artistsList,
  albumsPerArtist,
  hideControls,
  hidePagination,
  hideArrows,
  containerClass,
  textOverImage,
}: Props) {
  const artistsAmount = artistsList.slice(0, 5);
  const artistsTopAlbums = await Promise.all(
    artistsAmount.map(async (artist) => (
      getArtistAlbumsClient(artist.name, albumsPerArtist)
    )),
  );

  const sliderElements = artistsTopAlbums.map((albums) => {
    if (typeof albums !== 'boolean') {
      if (!albumsPerArtist || albumsPerArtist <= 1) {
        return (
          <AlbumCard
            key={albums.id}
            album={albums?.topalbums?.album?.[0]}
            textOverImage={textOverImage}
          />
        );
      }

      return albums.topalbums.album.map((album) => {
        const albumWithId = idToElement({ element: album });

        return (
          <AlbumCard
            key={albumWithId.id}
            album={albumWithId.item}
            textOverImage={textOverImage}
          />
        );
      });
    }

    return null;
  }).flat();

  return (
    <div className={containerClass}>
      <Slider
        sliderIdentifier="topalbums"
        autoWidth
        gap={16}
        elements={sliderElements}
        pagination={!(hidePagination || hideControls)}
        arrows={!(hideArrows || hideControls)}
        omitEnd
        perMove={1}
      />
    </div>
  );
}
