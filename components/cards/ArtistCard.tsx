import React from 'react';

interface Props {
  children: React.ReactNode
}

export default function ArtistCard({ children }: Props) {
  return (
    <div className="artist-card">
      {children}
    </div>
  );
}
