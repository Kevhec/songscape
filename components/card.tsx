import React from 'react';

interface Props {
  children: React.ReactNode
}

export default function Card({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  );
}
