import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UnitDetail = () => {
  const { unitId } = useParams();
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/units/${unitId}`);
        setUnit(response.data);
      } catch (error) {
        console.error('Error fetching unit', error);
      }
    };
    fetchUnit();
  }, [unitId]);

  if (!unit) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{unit.name}</h2>
      <p>{unit.description}</p>
      {/* Add more details and links to sessions */}
    </div>
  );
};

export default UnitDetail;
