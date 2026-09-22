import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaPlayCircle } from 'react-icons/fa';
import { ChittiContext } from '../context/ChittiContext.jsx';
import coursesData from '../data/coursesData';
import '../CSS/CourseViewer.css';

// Same env var your other pages already use for the API base.
const API_BASE = import.meta.env?.VITE_ALCB_API_URL || 'http://localhost:4000';

export default function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(ChittiContext);

  const courseData = coursesData.find((c) => c.id === courseId);

  const [expandedModule, setExpandedModule] = useState(
    courseData?.modules?.[0]?.id ?? null
  );
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [saveError, setSaveError] = useState(null);

  const authToken = localStorage.getItem('auth-token');
  const userId = userData?._id;
  // A token exists but ChittiContext's fetchUserData() call hasn't
  // resolved yet — this is "logged in, still loading", not "logged out".
  const isResolvingUser = !!authToken && !userData;

  // Load existing progress for this user + course on mount
  useEffect(() => {
    if (isResolvingUser) {
      // Wait for userData to arrive before deciding anything.
      return;
    }
    if (!userId || !courseId) {
      setLoadingProgress(false);
      return;
    }

    let cancelled = false;

    const fetchProgress = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/progress/${userId}/${courseId}`
        );
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
    setActiveVideoUrl(video.url);

    if (completedVideos.includes(video.id)) return;

    // Optimistic UI update
    setCompletedVideos((prev) => [...prev, video.id]);
    setSaveError(null);

    if (!authToken) {
      // Genuinely no session — nothing to persist, but don't silently
      // pretend it saved either.
      setSaveError('Not logged in: progress will not be saved.');
      return;
    }
    if (!userId) {
      // We have a token but userData hasn't loaded yet (e.g. clicked a
      // video right after page load). Skip the save rather than sending
      // userId: undefined to the backend.
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
      // Reconcile with what the server actually persisted, in case it
      // differs from our optimistic guess.
      setCompletedVideos(data.completedVideos || []);
    } catch (err) {
      console.error('Error saving progress:', err);
      setSaveError('Could not save progress. It may not persist on refresh.');
      // Roll back the optimistic update
      setCompletedVideos((prev) => prev.filter((id) => id !== video.id));
    }
  };

  if (!courseData) {
    return (
      <div className="course-viewer-container">
        <button className="back-btn" onClick={() => navigate('/courses')}>
          ← Back to Courses
        </button>
        <p>Course not found.</p>
      </div>
    );
  }

  return (
    <div className="course-viewer-container">
      <button className="back-btn" onClick={() => navigate('/courses')}>
        ← Back to Courses
      </button>

      {saveError && <div className="progress-error-banner">{saveError}</div>}

      <div className="course-viewer-grid">
        {/* Left Side: Video Player */}
        <div className="video-column">
          <div className="media-wrapper">
            {activeVideoUrl ? (
              <video src={activeVideoUrl} controls autoPlay className="media-content" />
            ) : (
              <img src={courseData.thumbnail} alt={courseData.title} className="media-content" />
            )}
          </div>
          <h1 className="course-title">{courseData.title}</h1>
          <p className="course-meta">
            {courseData.modulesCount} module · {courseData.videosCount} videos
          </p>
        </div>

        {/* Right Side: Timeline Playlist */}
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
                    const isLast = idx === module.videos.length - 1;

                    return (
                      <div key={video.id} className="timeline-item">
                        <div className="timeline-track">
                          <div className={`status-icon ${isCompleted ? 'completed' : 'pending'}`}>
                            {isCompleted ? <FaCheckCircle /> : <FaPlayCircle />}
                          </div>
                          {!isLast && <div className={`timeline-line ${isCompleted ? 'active-line' : ''}`} />}
                        </div>

                        <div
                          className={`video-card ${activeVideoUrl === video.url ? 'active' : ''}`}
                          onClick={() => handleVideoSelect(video)}
                        >
                          <div className="video-details">
                            <h4 className="video-name">{video.title}</h4>
                            <span className="video-duration">Video · {video.duration}</span>
                          </div>
                          {!isCompleted && <span className="watch-btn">Watch →</span>}
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