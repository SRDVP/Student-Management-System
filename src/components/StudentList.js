import React, { useState } from 'react';
import { useStudents } from '../context/StudentContext';
import StudentForm from './StudentForm';

function StudentList() {
  const { 
    filteredStudents, 
    deleteStudent, 
    stats,
    searchTerm,
    setSearchTerm,
    filterCourse,
    setFilterCourse,
    filterYear,
    setFilterYear
  } = useStudents();

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };

  const handleAddNew = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalStudents}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.averageGPA}</div>
          <div className="stat-label">Average GPA</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.courses.length}</div>
          <div className="stat-label">Courses</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredStudents.length}</div>
          <div className="stat-label">Filtered Results</div>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Student Management</h2>
          <button className="btn btn-primary" onClick={handleAddNew}>
            Add New Student
          </button>
        </div>

        {/* Search and Filters */}
        <div className="search-bar">
          <div className="form-row">
            <div className="form-group">
              <label>Search Students</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Filter by Course</label>
              <select
                className="form-control"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="">All Courses</option>
                {stats.courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Filter by Year</label>
              <select
                className="form-control"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="">All Years</option>
                {stats.years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Student Grid */}
      {filteredStudents.length === 0 ? (
        <div className="card no-students">
          <h3>No students found</h3>
          <p>Try adjusting your search criteria or add a new student.</p>
        </div>
      ) : (
        <div className="student-grid">
          {filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-info">
                <h3>{student.firstName} {student.lastName}</h3>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>GPA:</strong> {student.gpa}</p>
                <p><strong>Date of Birth:</strong> {formatDate(student.dateOfBirth)}</p>
                <p><strong>Enrollment Date:</strong> {formatDate(student.enrollmentDate)}</p>
                <p><strong>Address:</strong> {student.address}</p>
              </div>
              <div className="student-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Form Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default StudentList;
