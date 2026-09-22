import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChittiContext } from '../context/ChittiContext.jsx';
import coursesData from '../data/coursesData';
import '../CSS/Courses.css';

export default function Courses() {
  const navigate = useNavigate();
  const { selectedGrade, courses } = useContext(ChittiContext);

  const courseList = courses || coursesData;
  const filteredCourses = courseList.filter(
    (course) => !selectedGrade || course.grade === selectedGrade
  );

  return (
    <div className="courses-grid-page">
      <h2 className="page-heading">
        Courses {selectedGrade ? `(${selectedGrade})` : ''}
      </h2>
      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
                <p>{course.modulesCount || course.modules?.length || 1} module</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-courses-text">No courses found for {selectedGrade}.</p>
        )}
      </div>
    </div>
  );
}