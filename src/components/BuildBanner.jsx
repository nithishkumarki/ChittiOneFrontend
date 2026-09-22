import React from 'react';
import '../CSS/BuildBanner.css';

export default function BuildBanner({ title, subtitle, description, image, buttonText }) {
  return (
    <div className="featured-banner">
      <div className="banner-image">
        <img src={image} alt={title} />
      </div>
      <div className="banner-info">
        <span className="subtitle">{subtitle}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="btn-primary">{buttonText} →</button>
      </div>
    </div>
  );
}