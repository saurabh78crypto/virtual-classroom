import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container text-center my-5">
      <h1>Welcome to the Virtual Classroom</h1>
      <p>This is a web application where instructors can manage classes, units, and sessions, and students can access course materials and participate in discussions.</p>
      <Link to="/register/student" className="btn btn-primary mx-2">Register as Student</Link>
      <Link to="/register/instructor" className="btn btn-secondary mx-2">Register as Instructor</Link>
    </div>
  );
};

export default HomePage;
