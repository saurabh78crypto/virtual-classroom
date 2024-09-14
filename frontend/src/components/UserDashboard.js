import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboard = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes', error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="container">
      <h2>Classes</h2>
      <div className="list-group">
        {classes.map((cls) => (
          <Link
            key={cls._id}
            to={`/classes/${cls._id}`}
            className="list-group-item list-group-item-action"
          >
            {cls.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
