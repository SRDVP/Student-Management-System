import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const StudentContext = createContext();

// Initial state with sample data
const initialState = {
  students: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      dateOfBirth: '1998-05-15',
      address: '123 Main St, City, State 12345',
      course: 'Computer Science',
      year: 'Senior',
      gpa: '3.8',
      enrollmentDate: '2020-09-01'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      phone: '+1-555-0124',
      dateOfBirth: '1999-03-22',
      address: '456 Oak Ave, City, State 12346',
      course: 'Business Administration',
      year: 'Junior',
      gpa: '3.6',
      enrollmentDate: '2021-09-01'
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1-555-0125',
      dateOfBirth: '2000-01-10',
      address: '789 Pine Rd, City, State 12347',
      course: 'Engineering',
      year: 'Sophomore',
      gpa: '3.9',
      enrollmentDate: '2022-09-01'
    }
  ],
  searchTerm: '',
  filterCourse: '',
  filterYear: ''
};

// Action types
const ACTIONS = {
  ADD_STUDENT: 'ADD_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER_COURSE: 'SET_FILTER_COURSE',
  SET_FILTER_YEAR: 'SET_FILTER_YEAR',
  LOAD_STUDENTS: 'LOAD_STUDENTS'
};

// Reducer function
function studentReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_STUDENT:
      const newStudent = {
        ...action.payload,
        id: uuidv4()
      };
      return {
        ...state,
        students: [...state.students, newStudent]
      };

    case ACTIONS.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };

    case ACTIONS.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };

    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };

    case ACTIONS.SET_FILTER_COURSE:
      return {
        ...state,
        filterCourse: action.payload
      };

    case ACTIONS.SET_FILTER_YEAR:
      return {
        ...state,
        filterYear: action.payload
      };

    case ACTIONS.LOAD_STUDENTS:
      return {
        ...state,
        students: action.payload
      };

    default:
      return state;
  }
}

// Context Provider Component
export function StudentProvider({ children }) {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Load students from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      dispatch({
        type: ACTIONS.LOAD_STUDENTS,
        payload: JSON.parse(savedStudents)
      });
    }
  }, []);

  // Save students to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(state.students));
  }, [state.students]);

  // Action creators
  const addStudent = (studentData) => {
    dispatch({
      type: ACTIONS.ADD_STUDENT,
      payload: studentData
    });
  };

  const updateStudent = (studentData) => {
    dispatch({
      type: ACTIONS.UPDATE_STUDENT,
      payload: studentData
    });
  };

  const deleteStudent = (studentId) => {
    dispatch({
      type: ACTIONS.DELETE_STUDENT,
      payload: studentId
    });
  };

  const setSearchTerm = (term) => {
    dispatch({
      type: ACTIONS.SET_SEARCH_TERM,
      payload: term
    });
  };

  const setFilterCourse = (course) => {
    dispatch({
      type: ACTIONS.SET_FILTER_COURSE,
      payload: course
    });
  };

  const setFilterYear = (year) => {
    dispatch({
      type: ACTIONS.SET_FILTER_YEAR,
      payload: year
    });
  };

  // Filtered students based on search and filters
  const filteredStudents = state.students.filter(student => {
    const matchesSearch = state.searchTerm === '' || 
      student.firstName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(state.searchTerm.toLowerCase());

    const matchesCourse = state.filterCourse === '' || student.course === state.filterCourse;
    const matchesYear = state.filterYear === '' || student.year === state.filterYear;

    return matchesSearch && matchesCourse && matchesYear;
  });

  // Statistics
  const stats = {
    totalStudents: state.students.length,
    averageGPA: state.students.length > 0 
      ? (state.students.reduce((sum, student) => sum + parseFloat(student.gpa), 0) / state.students.length).toFixed(2)
      : '0.00',
    courses: [...new Set(state.students.map(student => student.course))],
    years: [...new Set(state.students.map(student => student.year))]
  };

  const value = {
    students: state.students,
    filteredStudents,
    searchTerm: state.searchTerm,
    filterCourse: state.filterCourse,
    filterYear: state.filterYear,
    stats,
    addStudent,
    updateStudent,
    deleteStudent,
    setSearchTerm,
    setFilterCourse,
    setFilterYear
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

// Custom hook to use the context
export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}
