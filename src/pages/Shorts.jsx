import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft, FiChevronUp, FiChevronDown, FiPlay } from 'react-icons/fi';
import '../CSS/Shorts.css'; // Make sure styling is imported

const PEXELS_API_KEY = 'ptXP0RtlUINvn2NQt94Ui2KUsrBdA3jj7kqPnCFIRAB0aDvBDRElyh8P'; // Replace with your actual Pexels API key

export default function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Active viewing state
  const [selectedIndex, setSelectedIndex] = useState(null); // null when in grid view, number when playing fullscreen

  // Fetch vertical science/learning videos from Pexels
  useEffect(() => {
    fetchPexelsShorts();
  }, []);

  const fetchPexelsShorts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        'https://api.pexels.com/videos/search?query=science&orientation=portrait&per_page=15',
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );

      const data = await response.json();

      if (data.videos && data.videos.length > 0) {
        // Transform Pexels payload into clean object structure
        const formattedShorts = data.videos.map((video) => {
          // Find optimal vertical SD/HD mp4 video file
          const mp4File =
            video.video_files.find(
              (file) => file.file_type === 'video/mp4' && file.width < file.height
            ) || video.video_files[0];

          return {
            id: video.id,
            title: `Short by ${video.user.name}`,
            videoUrl: mp4File ? mp4File.link : '',
            thumbnailUrl: video.image,
            creator: video.user.name,
            profileUrl: video.user.url,
          };
        });

        setShorts(formattedShorts);
      } else {
        setError('No shorts found.');
      }
    } catch (err) {
      console.error('Failed to fetch Pexels shorts:', err);
      setError('Failed to load videos. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  // Keyboard navigation (Up / Down arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, shorts.length]);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < shorts.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="shorts-page-container">
      {/* Header */}
      <div className="shorts-header">
        <h1 className="shorts-title">Shorts</h1>
        <p className="shorts-subtitle">
          Quick bites of science and making — tap one to watch.
        </p>
      </div>

      {/* Grid view of shorts */}
      {loading ? (
        <div className="shorts-loading">Loading videos...</div>
      ) : error ? (
        <div className="shorts-error">{error}</div>
      ) : (
        <div className="shorts-grid">
          {shorts.map((short, index) => (
            <div
              key={short.id}
              className="short-card"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="short-thumbnail-wrapper">
                <img src={short.thumbnailUrl} alt={short.title} />
                <div className="play-icon-overlay">
                  <FiPlay />
                </div>
              </div>
              <div className="short-card-info">
                <h3 className="short-card-title">{short.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Vertical Video Overlay */}
      {selectedIndex !== null && shorts[selectedIndex] && (
        <div className="shorts-player-overlay">
          {/* Back to Grid Button */}
          <button
            className="shorts-back-btn"
            onClick={() => setSelectedIndex(null)}
            title="Back to Grid"
          >
            <FiArrowLeft />
          </button>

          {/* Video Container */}
          <div className="shorts-video-wrapper">
            <video
              key={shorts[selectedIndex].id}
              src={shorts[selectedIndex].videoUrl}
              poster={shorts[selectedIndex].thumbnailUrl}
              autoPlay
              loop
              playsInline
              controls
              className="vertical-video-element"
            />

            <div className="short-video-details">
              <span className="short-badge">Chitti</span>
              <h2 className="short-video-title">{shorts[selectedIndex].title}</h2>
            </div>
          </div>

          {/* Up / Down Navigation Controls */}
          <div className="shorts-nav-controls">
            <button
              className="nav-arrow-btn"
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              title="Previous Short (Up Arrow)"
            >
              <FiChevronUp />
            </button>
            <span className="short-counter">
              {selectedIndex + 1} / {shorts.length}
            </span>
            <button
              className="nav-arrow-btn"
              onClick={handleNext}
              disabled={selectedIndex === shorts.length - 1}
              title="Next Short (Down Arrow)"
            >
              <FiChevronDown />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}