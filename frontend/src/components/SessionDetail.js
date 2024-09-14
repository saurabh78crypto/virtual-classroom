import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SessionDetail = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions/${sessionId}`);
        setSession(response.data);
      } catch (error) {
        console.error('Error fetching session', error);
      }
    };
    fetchSession();
  }, [sessionId]);

  if (!session) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{session.name}</h2>
      <p>{session.description}</p>
      {/* Add more details and links to lectures */}
    </div>
  );
};

export default SessionDetail;
