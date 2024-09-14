import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Comments = ({ lectureId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/lecture/${lectureId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/comments/lecture/${lectureId}/comment`, { text: newComment });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  const handleAddReply = async (commentId) => {
    try {
      await axios.post(`http://localhost:5000/api/comments/lecture/${lectureId}/comment/${commentId}/reply`, { text: reply });
      setReply('');
      setSelectedCommentId(null);
      fetchComments();
    } catch (error) {
      console.error('Error adding reply', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <div className="form-group">
          <textarea
            className="form-control"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Add Comment</button>
      </form>
      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border p-2 mb-2">
            <p>{comment.text}</p>
            <button className="btn btn-secondary" onClick={() => setSelectedCommentId(comment._id)}>Reply</button>
            {selectedCommentId === comment._id && (
              <div className="mt-2">
                <textarea
                  className="form-control"
                  rows="2"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  required
                />
                <button className="btn btn-primary mt-2" onClick={() => handleAddReply(comment._id)}>Add Reply</button>
              </div>
            )}
            {comment.replies.map((reply) => (
              <div key={reply._id} className="border p-2 mt-2 ml-4">
                <p>{reply.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
