import React from 'react';
import { StudentProvider } from './context/StudentContext';
import StudentList from './components/StudentList';

function App() {
  return (
    <StudentProvider>
      <div className="container">
        <header className="header">
          <h1>Student Management System</h1>
          <p>Manage student records efficiently and effectively</p>
        </header>
        
        <main>
          <StudentList />
        </main>
      </div>
    </StudentProvider>
  );
}

export default App;
