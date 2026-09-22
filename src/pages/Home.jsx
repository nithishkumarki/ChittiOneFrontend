import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChittiContext } from '../context/ChittiContext.jsx';
import coursesData from '../data/coursesData';
import '../CSS/Home.css';

const PEXELS_API_KEY = 'ptXP0RtlUINvn2NQt94Ui2KUsrBdA3jj7kqPnCFIRAB0aDvBDRElyh8P';

export default function Home() {
  const navigate = useNavigate();
  const { selectedGrade } = useContext(ChittiContext);

  const [shorts, setShorts] = useState([]);
  const [loadingShorts, setLoadingShorts] = useState(true);
  const [inProgressCourse, setInProgressCourse] = useState(null);

  // 1. Check if user has started a course (from localStorage or Context)
  useEffect(() => {
    const savedCourseId = localStorage.getItem('lastStartedCourseId');
    if (savedCourseId) {
      const course = coursesData.find((c) => String(c.id) === String(savedCourseId));
      setInProgressCourse(course || coursesData[0]);
    } else if (coursesData.length > 0) {
      // Fallback sample in-progress course
      setInProgressCourse(coursesData[0]);
    }
  }, []);

  // 2. Fetch Pexels Shorts for the home feed
  useEffect(() => {
    fetchPexelsShorts();
  }, []);

  const fetchPexelsShorts = async () => {
    try {
      setLoadingShorts(true);
      const res = await fetch(
        'https://api.pexels.com/videos/search?query=science&orientation=portrait&per_page=6',
        {
          headers: { Authorization: PEXELS_API_KEY },
        }
      );
      const data = await res.json();
      if (data.videos) {
        const formatted = data.videos.map((vid) => ({
          id: vid.id,
          title: `Short by ${vid.user.name}`,
          thumbnailUrl: vid.image,
        }));
        setShorts(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch home shorts:', err);
    } finally {
      setLoadingShorts(false);
    }
  };

  // Filter courses for recommended section
  const recommendedCourses = coursesData.filter(
    (c) => !selectedGrade || c.grade === selectedGrade
  );

  return (
    <div className="home-feed-container">
      {/* 1. Build of the Week Banner */}
      <div className="build-banner-card">
        <div className="banner-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
            alt="Coanda Effect"
          />
        </div>
        <div className="banner-content">
          <span className="banner-tag">BUILD OF THE WEEK · WEEK 2</span>
          <h2 className="banner-title">Coanda Effect</h2>
          <p className="banner-description">Watch the build video and make it yourself this week.</p>
          <button className="banner-btn" onClick={() => navigate('/builds')}>
            Start building
          </button>
        </div>
      </div>

      {/* 2. Continue Learning Section (Only rendered if user has started a course) */}
      {inProgressCourse && (
        <section className="home-section">
          <div className="section-header">
            <h3>Continue learning</h3>
          </div>
          <div className="continue-learning-grid">
            <div
              className="course-card continue-card"
              onClick={() => navigate(`/courses/${inProgressCourse.id}`)}
            >
              <div className="card-image-wrapper">
                <img src={inProgressCourse.thumbnail} alt={inProgressCourse.title} />
              </div>
              <div className="card-info">
                <h3>{inProgressCourse.title}</h3>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Shorts For You Section */}
      <section className="home-section">
        <div className="section-header">
          <h3>Shorts for you</h3>
          <Link to="/shorts" className="view-all-link">View all</Link>
        </div>
        {loadingShorts ? (
          <div className="section-loading">Loading shorts...</div>
        ) : (
          <div className="shorts-grid-6">
            {shorts.map((item) => (
              <div
                key={item.id}
                className="short-feed-card"
                onClick={() => navigate('/shorts')}
              >
                <div className="short-img-wrapper">
                  <img src={item.thumbnailUrl} alt={item.title} />
                </div>
                <p className="short-feed-title">{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Recommended For You Section */}
      <section className="home-section">
        <div className="section-header">
          <h3>Recommended for you</h3>
        </div>
        <div className="courses-grid-home">
          {recommendedCourses.slice(0, 8).map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className="card-image-wrapper">
                <img src={course.thumbnail} alt={course.title} />
              </div>
              <div className="card-info">
                <h3>{course.title}</h3>
                <p>{course.modulesCount || 1} module</p>
              </div>
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
}