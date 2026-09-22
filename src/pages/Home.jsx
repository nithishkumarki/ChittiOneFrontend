import React from 'react';
import { Link } from 'react-router-dom';
import BuildBanner from '../components/BuildBanner';
import ShortCard from '../components/ShortCard';
import '../CSS/Home.css';

export default function Home() {
  const shortsData = [
    { id: 1, img: 'https://via.placeholder.com/200x350?text=Short+1' },
    { id: 2, img: 'https://via.placeholder.com/200x350?text=Short+2' },
    { id: 3, img: 'https://via.placeholder.com/200x350?text=Short+3' },
    { id: 4, img: 'https://via.placeholder.com/200x350?text=Short+4' },
    { id: 5, img: 'https://via.placeholder.com/200x350?text=Short+5' },
    { id: 6, img: 'https://via.placeholder.com/200x350?text=Short+6' },
  ];

  return (
    <div className="page-content">
      <BuildBanner
        subtitle="BUILD OF THE WEEK · WEEK 1"
        title="String telephone"
        description="Watch the build video and make it yourself this week."
        buttonText="Start building"
        image="https://via.placeholder.com/600x400"
      />

      <div className="shorts-section">
        <div className="section-header">
          <h3>Shorts for you</h3>
          <Link to="/shorts" className="view-all">View all</Link>
        </div>
        <div className="shorts-grid">
          {shortsData.map((item) => (
            <ShortCard key={item.id} thumbnail={item.img} />
          ))}
        </div>
      </div>
    </div>
  );
}