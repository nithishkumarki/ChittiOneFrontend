import React from 'react';
import '../CSS/ShortCard.css';

export default function ShortCard({ thumbnail, title }) {
  return (
    <div className="short-card">
      <img src={thumbnail} alt={title || 'Short thumbnail'} />
    </div>
  );
}