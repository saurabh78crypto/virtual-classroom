import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };

  const handleCreateClass = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/classes',
        { name: newClassName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewClassName('');
      setShowCreateClass(false);
      fetchClasses();
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

  const handleSelectClass = (classId) => {
    navigate(`/classes/${classId}`);
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowCreateClass(true)}>
        Create New Class
      </button>
      {showCreateClass && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={handleCreateClass}>
            Create Class
          </button>
          <button className="btn btn-secondary mt-2" onClick={() => setShowCreateClass(false)}>
            Cancel
          </button>
        </div>
      )}
      <h3>Classes</h3>
      <ul className="list-group">
        {classes.map((classItem) => (
          <li
            key={classItem._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {classItem.name}
            <button className="btn btn-info btn-sm" onClick={() => handleSelectClass(classItem._id)}>
              Manage
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
