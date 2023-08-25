import React from 'react';

export default async function page({ params }: { params: { artist: string } }) {
  return (
    <div>
      {`Artist number ${params.artist.replace('%20', ' ')}`}
    </div>
  );
}
