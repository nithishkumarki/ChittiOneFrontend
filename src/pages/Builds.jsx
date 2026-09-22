import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiX, FiPlay } from 'react-icons/fi';
import '../CSS/Builds.css';

export default function Builds() {
  const [activeTab, setActiveTab] = useState('builds'); // 'builds' | 'myBuilds'
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected build for video modal viewer
  const [selectedBuild, setSelectedBuild] = useState(null);

  // Form modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    thumbnailUrl: '',
    videoUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Re-fetch builds whenever activeTab changes
  useEffect(() => {
    if (activeTab === 'builds') {
      fetchBuilds();
    } else if (activeTab === 'myBuilds') {
      fetchMyBuilds();
    }
  }, [activeTab]);

 /* const fetchBuilds = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/getAllBuilds');
      const data = await res.json();
      if (data.success) {
        setBuilds(data.builds);
      }
    } catch (err) {
      console.error('Error loading builds:', err);
    } finally {
      setLoading(false);
    }
  };*/
  // Dummy builds array matching your target UI structure
const DUMMY_BUILDS = [
  {
    _id: 'dummy-1',
    title: 'Coanda Effect',
    week: 'WEEK 2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/123456789/view',
  },
  {
    _id: 'dummy-2',
    title: 'String telephone',
    week: 'WEEK 1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/987654321/view',
  },
];

const fetchBuilds = async () => {
  try {
    setLoading(true);
    const res = await fetch('http://localhost:4000/getAllBuilds');
    const data = await res.json();
    
    if (data.success && data.builds && data.builds.length > 0) {
      setBuilds(data.builds);
    } else {
      // Fallback to dummy data if API response is empty
      setBuilds(DUMMY_BUILDS);
    }
  } catch (err) {
    console.error('Error loading builds, falling back to dummy builds:', err);
    // Fallback to dummy data on network or backend error
    setBuilds(DUMMY_BUILDS);
  } finally {
    setLoading(false);
  }
};

  const fetchMyBuilds = async () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      setBuilds([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/getMyBuilds', {
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setBuilds(data.builds);
      }
    } catch (err) {
      console.error('Error fetching personal builds:', err);
    } finally {
      setLoading(false);
    }
  };

  // Convert shareable Drive links into embeddable URLs
  const getEmbedVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com') && url.includes('/view')) {
      return url.replace('/view', '/preview');
    }
    return url;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const token = localStorage.getItem('auth-token');

    if (!token) {
      setSubmitError('Please log in to submit a build.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/addbuild', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setBuilds([data.build, ...builds]);
        setFormData({ title: '', thumbnailUrl: '', videoUrl: '' });
        setIsSubmitModalOpen(false);
      } else {
        setSubmitError(data.error || 'Failed to submit build');
      }
    } catch (err) {
      setSubmitError('Server error while submitting build.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="builds-container">
      {/* Header Section */}
      <div className="builds-header">
        <h1 className="builds-title">Builds</h1>
        <p className="builds-subtitle">
          Hands-on projects to build along with, week by week. Submitting your build happens in the Chitti app.
        </p>

        {/* Tab Filters */}
        <div className="builds-tabs">
          <button
            className={`tab-btn ${activeTab === 'builds' ? 'active' : ''}`}
            onClick={() => setActiveTab('builds')}
          >
            Builds
          </button>
          <button
            className={`tab-btn ${activeTab === 'myBuilds' ? 'active' : ''}`}
            onClick={() => setActiveTab('myBuilds')}
          >
            My builds
          </button>
        </div>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="builds-loading">Loading projects...</div>
      ) : builds.length === 0 ? (
        <div className="builds-empty">
          {activeTab === 'myBuilds'
            ? 'You have not saved or submitted any builds yet.'
            : 'No builds available yet.'}
        </div>
      ) : (
        <div className="builds-grid">
          {builds.map((item, index) => (
            <div
              key={item._id || index}
              className="build-card"
              onClick={() => setSelectedBuild(item)}
            >
              <div className="card-thumbnail-wrapper">
                <img src={item.thumbnailUrl} alt={item.title} className="card-thumbnail" />
              </div>
              <div className="card-info">
                <span className="week-tag">WEEK {builds.length - index}</span>
                <h3 className="card-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Video Player Overlay */}
      {selectedBuild && (
        <div className="video-overlay">
          <button className="video-back-btn" onClick={() => setSelectedBuild(null)}>
            <FiArrowLeft />
          </button>

          <div className="video-player-container">
            {selectedBuild.videoUrl.includes('drive.google.com') ? (
              <iframe
                src={getEmbedVideoUrl(selectedBuild.videoUrl)}
                title={selectedBuild.title}
                className="video-frame"
                allow="autoplay"
                allowFullScreen
              />
            ) : (
              <div className="thumbnail-fallback">
                <img src={selectedBuild.thumbnailUrl} alt={selectedBuild.title} />
                <a
                  href={selectedBuild.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="play-overlay-btn"
                >
                  <FiPlay />
                </a>
              </div>
            )}
          </div>

          <div className="floating-banner">
            <button className="close-banner-btn" onClick={() => setSelectedBuild(null)}>
              <FiX />
            </button>
            <p className="banner-heading">Built it yourself?</p>
            <p className="banner-subtext">
              Upload a photo or video of your build in the Chitti app and earn coins.
            </p>
            <button
              className="submit-app-btn"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              Submit In the app
            </button>
          </div>
        </div>
      )}

      {/* Submit Build Form Modal */}
      {isSubmitModalOpen && (
        <div className="modal-backdrop">
          <div className="submit-modal">
            <div className="modal-header">
              <h2>Submit Your Build</h2>
              <button
                className="modal-close-icon"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            {submitError && <div className="form-error-msg">{submitError}</div>}

            <form onSubmit={handleFormSubmit} className="build-form">
              <div className="form-group">
                <label>Build Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Coanda Effect or String Telephone"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Thumbnail Image URL</label>
                <input
                  type="url"
                  name="thumbnailUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.thumbnailUrl}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Video URL (Google Drive shareable link or Embed link)</label>
                <input
                  type="url"
                  name="videoUrl"
                  placeholder="https://drive.google.com/file/d/..."
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsSubmitModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Build'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}