import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChittiContext } from '../context/ChittiContext.jsx';
import '../CSS/Courses.css';

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();
  const { courses = [], builds = [], shorts = [] } = useContext(ChittiContext);

  const searchTerm = query ? query.toLowerCase().trim() : '';

  const matchingCourses = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchTerm) ||
      c.description?.toLowerCase().includes(searchTerm)
  );

  const matchingBuilds = builds.filter(
    (b) =>
      b.title?.toLowerCase().includes(searchTerm) ||
      b.description?.toLowerCase().includes(searchTerm)
  );

  const matchingShorts = shorts.filter(
    (s) =>
      s.title?.toLowerCase().includes(searchTerm) ||
      s.category?.toLowerCase().includes(searchTerm)
  );

  const totalResults = matchingCourses.length + matchingBuilds.length + matchingShorts.length;

  const handleCourseClick = (course) => {
    if (course.id) {
      navigate(`/courses/${course.id}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="search-results-page" style={{ padding: '24px 40px' }}>
      <h1 className="page-heading" style={{ fontSize: '28px', marginBottom: '24px' }}>
        Results for “{query}” <span style={{ color: '#888', fontSize: '20px' }}>({totalResults})</span>
      </h1>

      {/* Courses Section */}
      {matchingCourses.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#111' }}>Courses</h2>
          <div className="courses-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {matchingCourses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => handleCourseClick(course)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-image-wrapper">
                  <img src={course.thumbnail} alt={course.title} />
                </div>
                <div className="card-info">
                  <h3>{course.title}</h3>
                  {course.description && (
                    <p style={{ color: '#666', fontSize: '13px' }}>{course.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Builds Section */}
      {matchingBuilds.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#111' }}>Builds</h2>
          <div className="courses-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {matchingBuilds.map((build) => (
              <div 
                key={build._id || build.id} 
                className="course-card"
                onClick={() => navigate('/builds')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-image-wrapper">
                  <img src={build.thumbnail || build.imageUrl} alt={build.title} />
                </div>
                <div className="card-info">
                  <h3>{build.title}</h3>
                  <p style={{ color: '#666', fontSize: '13px' }}>{build.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Shorts Section */}
      {matchingShorts.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#111' }}>Shorts</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {matchingShorts.map((short) => (
              <div
                key={short.id}
                onClick={() => navigate('/shorts')}
                style={{
                  width: '160px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#f3f4f6',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                />
                <p style={{ padding: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                  {short.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {totalResults === 0 && (
        <p className="no-results" style={{ color: '#666', marginTop: '16px' }}>
          No courses, builds, or shorts found matching "{query}".
        </p>
      )}
    </div>
  );
}