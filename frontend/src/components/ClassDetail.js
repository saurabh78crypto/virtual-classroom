import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassDetails = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [lecturesBySession, setLecturesBySession] = useState({});
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddSession, setShowAddSession] = useState(false);
  const [showAddLecture, setShowAddLecture] = useState(false);
  const [bookName, setBookName] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureContent, setLectureContent] = useState('');

  useEffect(() => {
    fetchClassDetails();
    fetchUnits();
    fetchSessions();
  }, [classId]);

  const fetchClassDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/classes/${classId}`);
      setClassInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch class details:', error);
    }
  };

  const fetchUnits = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/units/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnits(response.data);
    } catch (error) {
      console.error('Failed to fetch units:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/sessions/${classId}/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const fetchLectures = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/lectures/${sessionId}/lectures`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLecturesBySession(prev => ({ ...prev, [sessionId]: response.data }));
    } catch (error) {
      console.error('Failed to fetch lectures:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/units/${classId}/units`,
        { name: bookName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookName('');
      setShowAddBook(false);
      fetchUnits();
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleAddSession = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/classes/${classId}/sessions`,
        { name: sessionName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSessionName('');
      setShowAddSession(false);
      fetchSessions();
    } catch (error) {
      console.error('Failed to add session:', error);
    }
  };

  const handleSelectSession = async (sessionId) => {
    setSelectedSession(sessionId);
    fetchLectures(sessionId);
    setShowAddLecture(true);
  };

  const handleAddLecture = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/lectures/${selectedSession}/lectures`,
        { title: lectureTitle, content: lectureContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLectureTitle('');
      setLectureContent('');
      setShowAddLecture(false);
      fetchLectures(selectedSession); 
    } catch (error) {
      console.error('Failed to add lecture:', error);
    }
  };

  return (
    <div className="container">
      {classInfo && (
        <>
          <h2 className="text-center my-4">{classInfo.name}</h2>

          {/* Units (Books) Section */}
          <div className="mb-4">
            <h4>Books</h4>
            {units.length === 0 ? (
              <p>No books available. <button className="btn btn-primary" onClick={() => setShowAddBook(true)}>Add Book</button></p>
            ) : (
              <>
                <ul className="list-group">
                  {units.map((unit) => (
                    <li key={unit._id} className="list-group-item">
                      {unit.name}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-2" onClick={() => setShowAddBook(true)}>Add Book</button>
              </>
            )}
          </div>

          {/* Sessions Section */}
          <div className="mb-4">
            <h4>Sessions</h4>
            {sessions.length === 0 ? (
              <p>No sessions available. <button className="btn btn-primary" onClick={() => setShowAddSession(true)}>Add Session</button></p>
            ) : (
              <>
                <ul className="list-group">
                  {sessions.map((session) => (
                    <li key={session._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        {session.name}
                        <button className="btn btn-info btn-sm" onClick={() => handleSelectSession(session._id)}>Add Lectures</button>
                      </div>
                      {selectedSession === session._id && lecturesBySession[session._id] && (
                        <ul className="list-group mt-2">
                          {lecturesBySession[session._id].map((lecture) => (
                            <li key={lecture._id} className="list-group-item">
                              {lecture.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-2" onClick={() => setShowAddSession(true)}>Add Session</button>
              </>
            )}
          </div>

          {/* Add Book Modal */}
          {showAddBook && (
            <div className="modal fade show" style={{ display: 'block' }} role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Book</h5>
                    <button type="button" className="close" onClick={() => setShowAddBook(false)}>&times;</button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Book Name"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={handleAddBook}>Add Book</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddBook(false)}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Session Modal */}
          {showAddSession && (
            <div className="modal fade show" style={{ display: 'block' }} role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Session</h5>
                    <button type="button" className="close" onClick={() => setShowAddSession(false)}>&times;</button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Session Name"
                      value={sessionName}
                      onChange={(e) => setSessionName(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={handleAddSession}>Add Session</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddSession(false)}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Lecture Modal */}
          {showAddLecture && selectedSession && (
            <div className="modal fade show" style={{ display: 'block' }} role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Lecture</h5>
                    <button type="button" className="close" onClick={() => setShowAddLecture(false)}>&times;</button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Lecture Title"
                      value={lectureTitle}
                      onChange={(e) => setLectureTitle(e.target.value)}
                    />
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Lecture Content"
                      value={lectureContent}
                      onChange={(e) => setLectureContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={handleAddLecture}>Add Lecture</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddLecture(false)}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassDetails;
