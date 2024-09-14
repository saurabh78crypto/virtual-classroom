import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import 'bootstrap/dist/css/bootstrap.min.css';

const LectureDetail = () => {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/lectures/${lectureId}`);
        setLecture(response.data);
      } catch (error) {
        console.error('Error fetching lecture', error);
      }
    };
    fetchLecture();
  }, [lectureId]);

  if (!lecture) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{lecture.title}</h2>
      <p>{lecture.description}</p>
      <Comments lectureId={lectureId} />
    </div>
  );
};

export default LectureDetail;
