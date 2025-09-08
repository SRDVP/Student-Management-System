import React, { useState, useEffect } from 'react';
import { useStudents } from '../context/StudentContext';

function StudentForm({ student, onClose }) {
  const { addStudent, updateStudent } = useStudents();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    course: '',
    year: '',
    gpa: '',
    enrollmentDate: ''
  });

  const [errors, setErrors] = useState({});

  // Populate form if editing
  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    if (!formData.gpa.trim()) newErrors.gpa = 'GPA is required';
    else if (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4) {
      newErrors.gpa = 'GPA must be a number between 0 and 4';
    }
    if (!formData.enrollmentDate) newErrors.enrollmentDate = 'Enrollment date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (student) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }
    
    onClose();
  };

  const courseOptions = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Psychology',
    'English Literature',
    'History',
    'Economics',
    'Political Science'
  ];

  const yearOptions = [
    'Freshman',
    'Sophomore',
    'Junior',
    'Senior',
    'Graduate'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                className={`form-control ${errors.firstName ? 'error' : ''}`}
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                className={`form-control ${errors.lastName ? 'error' : ''}`}
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              className={`form-control ${errors.phone ? 'error' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                className={`form-control ${errors.dateOfBirth ? 'error' : ''}`}
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
              <label>Enrollment Date *</label>
              <input
                type="date"
                name="enrollmentDate"
                className={`form-control ${errors.enrollmentDate ? 'error' : ''}`}
                value={formData.enrollmentDate}
                onChange={handleChange}
              />
              {errors.enrollmentDate && <span className="error-text">{errors.enrollmentDate}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              className={`form-control ${errors.address ? 'error' : ''}`}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows="3"
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Course *</label>
              <select
                name="course"
                className={`form-control ${errors.course ? 'error' : ''}`}
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select a course</option>
                {courseOptions.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.course && <span className="error-text">{errors.course}</span>}
            </div>

            <div className="form-group">
              <label>Year *</label>
              <select
                name="year"
                className={`form-control ${errors.year ? 'error' : ''}`}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">Select year</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>GPA *</label>
            <input
              type="number"
              name="gpa"
              className={`form-control ${errors.gpa ? 'error' : ''}`}
              value={formData.gpa}
              onChange={handleChange}
              placeholder="Enter GPA (0.0 - 4.0)"
              step="0.1"
              min="0"
              max="4"
            />
            {errors.gpa && <span className="error-text">{errors.gpa}</span>}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary">
              {student ? 'Update Student' : 'Add Student'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
