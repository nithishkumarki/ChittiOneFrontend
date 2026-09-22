import React, { useState, useContext } from 'react';
import { ChittiContext } from '../context/ChittiContext.jsx';
import CourseViewer from '../components/CourseViewer';
import '../CSS/Courses.css';

const coursesData = [
  { id: 'biology', title: 'Biology', modulesCount: 1, videosCount: 64, thumbnail: 'https://via.placeholder.com/400x220/221100/ff3333?text=Biology' },
  { id: 'cwc', title: 'CWC', modulesCount: 1, videosCount: 12, thumbnail: 'https://via.placeholder.com/400x220/330066/ffffff?text=CWC' },
  { id: 'chemistry', title: 'Chemistry', modulesCount: 1, videosCount: 20, thumbnail: 'https://via.placeholder.com/400x220/001133/3399ff?text=Chemistry' },
  { id: 'physics', title: 'Physics', modulesCount: 1, videosCount: 15, thumbnail: 'https://via.placeholder.com/400x220/003322/00ffcc?text=Physics' }
];

export default function Courses() {
  const { searchQuery } = useContext(ChittiContext);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Filter courses by context query
  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  if (selectedCourse) {
    return <CourseViewer course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="courses-grid-page">
      <h1 className="page-heading">Courses</h1>
      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="card-image-wrapper">
                <img src={course.thumbnail} alt={course.title} />
              </div>
              <div className="card-info">
                <h3>{course.title}</h3>
                <p>{course.modulesCount} module</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No courses match "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
}