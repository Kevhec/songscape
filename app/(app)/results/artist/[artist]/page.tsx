import React from 'react';

interface Props {
  params: {
    artist: string
  }
  searchParams: {
    id: string
  }
}

export default function page({ params, searchParams }: Props) {
  return (
    <div>
      <p>{`Artist name ${params.artist.replace('%20', ' ')}`}</p>
      <p>{`Artist id ${searchParams.id}`}</p>
    </div>
  );
}
