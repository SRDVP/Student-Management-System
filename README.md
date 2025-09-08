# Student Management System

A modern, responsive React.js application for managing student records with full CRUD (Create, Read, Update, Delete) functionality.

## Features

- **Student Management**: Add, edit, view, and delete student records
- **Search & Filter**: Search students by name, email, or course with real-time filtering
- **Course & Year Filters**: Filter students by course and academic year
- **Statistics Dashboard**: View total students, average GPA, and course distribution
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Data Persistence**: Student data is saved to browser's local storage
- **Form Validation**: Comprehensive form validation with error messages

## Student Information Tracked

- Personal Details: First Name, Last Name, Email, Phone, Date of Birth, Address
- Academic Information: Course, Academic Year, GPA, Enrollment Date
- Unique ID for each student record

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
   ```bash
   cd student-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── StudentList.js      # Main component displaying student grid and controls
│   └── StudentForm.js      # Form component for adding/editing students
├── context/
│   └── StudentContext.js   # React Context for state management
├── App.js                  # Main application component
├── index.js               # Application entry point
└── index.css              # Global styles and responsive design
```

## Usage

### Adding a Student
1. Click the "Add New Student" button
2. Fill in all required fields (marked with *)
3. Click "Add Student" to save

### Editing a Student
1. Find the student in the grid
2. Click the "Edit" button on their card
3. Modify the information
4. Click "Update Student" to save changes

### Deleting a Student
1. Find the student in the grid
2. Click the "Delete" button on their card
3. Confirm the deletion in the popup

### Searching and Filtering
- Use the search bar to find students by name, email, or course
- Use the course dropdown to filter by specific courses
- Use the year dropdown to filter by academic year
- Combine filters for more specific results

## Data Storage

Student data is automatically saved to your browser's local storage, so your data persists between sessions. The application comes with sample data to help you get started.

## Technologies Used

- **React 18** - Frontend framework
- **React Context API** - State management
- **CSS3** - Styling with modern features (Grid, Flexbox, Gradients)
- **UUID** - Unique ID generation for students
- **Local Storage** - Data persistence

## Browser Support

This application works in all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Future Enhancements

Potential features for future versions:
- Export student data to CSV/PDF
- Import students from CSV files
- Photo upload for student profiles
- Advanced reporting and analytics
- Email integration for student communication
- Backup and restore functionality
- Multi-user support with authentication

## Support

If you encounter any issues or have questions, please create an issue in the project repository.
