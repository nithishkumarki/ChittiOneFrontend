import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaPlayCircle } from 'react-icons/fa';
import { ChittiContext } from '../context/ChittiContext.jsx';
import coursesData from '../data/coursesData';
import '../CSS/CourseViewer.css';

const API_BASE = import.meta.env?.VITE_ALCB_API_URL || 'http://localhost:4000';

export default function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(ChittiContext);

  const courseData = coursesData.find((c) => c.id === courseId);

  const [expandedModule, setExpandedModule] = useState(
    courseData?.modules?.[0]?.id ?? null
  );
  const [activeVideo, setActiveVideo] = useState(
    courseData?.modules?.[0]?.videos?.[0] || null
  );
  const [completedVideos, setCompletedVideos] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [saveError, setSaveError] = useState(null);

  const authToken = localStorage.getItem('auth-token');
  const userId = userData?._id;
  const isResolvingUser = !!authToken && !userData;

  useEffect(() => {
    if (isResolvingUser) return;
    if (!userId || !courseId) {
      setLoadingProgress(false);
      return;
    }

    let cancelled = false;

    const fetchProgress = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/progress/${userId}/${courseId}`);
        if (!res.ok) throw new Error(`Progress fetch failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setCompletedVideos(data.completedVideos || []);
        }
      } catch (err) {
        console.error('Error loading progress:', err);
      } finally {
        if (!cancelled) setLoadingProgress(false);
      }
    };

    fetchProgress();
    return () => {
      cancelled = true;
    };
  }, [userId, courseId, isResolvingUser]);

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleVideoSelect = async (video) => {
    setActiveVideo(video);

    if (completedVideos.includes(video.id)) return;

    setCompletedVideos((prev) => [...prev, video.id]);
    setSaveError(null);

    if (!authToken) {
      setSaveError('Not logged in: progress will not be saved.');
      return;
    }
    if (!userId) {
      setSaveError('Still loading your account — try again in a moment.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/progress/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { 'auth-token': authToken } : {}),
        },
        body: JSON.stringify({
          userId,
          courseId,
          videoId: video.id,
        }),
      });

      if (!res.ok) throw new Error(`Save failed: ${res.status}`);

      const data = await res.json();
      setCompletedVideos(data.completedVideos || []);
    } catch (err) {
      console.error('Error saving progress:', err);
      setSaveError('Could not save progress.');
      setCompletedVideos((prev) => prev.filter((id) => id !== video.id));
    }
  };

  if (!courseData) {
    return (
      <div className="course-viewer-container">
        <button className="back-btn" onClick={() => navigate('/courses')}>
          ← Back to Overview
        </button>
        <p>Course not found.</p>
      </div>
    );
  }

  const currentVideo = activeVideo || courseData?.modules?.[0]?.videos?.[0];

  return (
    <div className="course-viewer-container">
      {saveError && <div className="progress-error-banner">{saveError}</div>}

      <div className="course-viewer-grid">
        {/* Left Section / Main Player Area */}
        <div className="video-column">
          <div className="media-wrapper">
            {currentVideo?.url ? (
              <video src={currentVideo.url} controls autoPlay className="media-content" />
            ) : (
              <img src={courseData.thumbnail} alt={courseData.title} className="media-content" />
            )}
          </div>

          <div className="course-header-row">
            <div>
              <h1 className="course-title">{currentVideo?.title || courseData.title}</h1>
              <p className="course-subtitle">{courseData.title}</p>
            </div>
            <button className="back-overview-btn" onClick={() => navigate('/courses')}>
              Back to overview
            </button>
          </div>
        </div>

        {/* Right Section / Modules Sidebar */}
        <div className="modules-column">
          {courseData.modules.length === 0 && (
            <p className="no-modules-text">No modules yet for this course.</p>
          )}

          {courseData.modules.map((module) => (
            <div key={module.id} className="module-card">
              <button className="module-header" onClick={() => toggleModule(module.id)}>
                <div>
                  <h3 className="module-title">{module.title}</h3>
                  <span className="module-subtitle">{module.videos.length} Videos</span>
                </div>
                <span className="arrow">{expandedModule === module.id ? '▲' : '▼'}</span>
              </button>

              {expandedModule === module.id && (
                <div className="timeline-container">
                  {loadingProgress && <p className="progress-loading-text">Loading progress…</p>}
                  {module.videos.map((video, idx) => {
                    const isCompleted = completedVideos.includes(video.id);
                    const isActive = currentVideo?.id === video.id;
                    const isLast = idx === module.videos.length - 1;

                    return (
                      <div key={video.id} className="timeline-item">
                        <div className="timeline-track">
                          <div className={`status-icon ${isCompleted ? 'completed' : 'pending'}`}>
                            {isCompleted ? <FaCheckCircle /> : <FaPlayCircle />}
                          </div>
                          {!isLast && (
                            <div className={`timeline-line ${isCompleted ? 'active-line' : ''}`} />
                          )}
                        </div>

                        <div
                          className={`video-card ${isActive ? 'active' : ''}`}
                          onClick={() => handleVideoSelect(video)}
                        >
                          <div className="video-details">
                            <h4 className="video-name">{video.title}</h4>
                            <span className="video-duration">Video · {video.duration}</span>
                          </div>
                          {!isCompleted && !isActive && <span className="watch-btn">Watch →</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}