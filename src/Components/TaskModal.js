import React, { useState, useEffect } from 'react';

const TaskModal = ({ showModal, onClose, onSave, selectedTask }) => {
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (!showModal) {
      setAssignedTo('');
      setStatus('pending');
      setDueDate('');
      setPriority('low');
      setComments('');
    }
  }, [showModal]);

  useEffect(() => {
    if (selectedTask) {
      setAssignedTo(selectedTask.assignedTo || '');
      setStatus(selectedTask.status || 'pending');
      setDueDate(selectedTask.dueDate || '');
      setPriority(selectedTask.priority || 'low');
      setComments(selectedTask.comments || '');
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      assignedTo,
      status,
      dueDate,
      priority,
      comments,
    };
    onSave(newTask);
    onClose(); 
  };

  if (!showModal) return null;

  return (
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden={!showModal}
      style={{ display: showModal ? 'block' : 'none' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title">
              {selectedTask ? 'Edit Task' : 'Add New Task'}
            </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={onClose}
              style={{backgroundColor:"transparent",color:"black", fontSize:"30px",marginBottom:"10px"}}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="assignedTo">Assigned To:</label>
                <input
                  id="assignedTo"
                  type="text"
                  className="form-control"
                  value={assignedTo}
                  required
                   pattern="[A-Za-z\s]+"
                  onChange={(e) => setAssignedTo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  className="form-control"
                  value={status}
                  required
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending" required>Pending</option>
                  <option value="completed" required>Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date:</label>
                <input
                  id="dueDate"
                  type="date"
                  className="form-control"
                  value={dueDate}
                  required
                  min={new Date().toISOString().split('T')[0]} 
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  className="form-control"
                  value={priority}
                  required
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="comments">Task Comments:</label>
                <textarea
                  id="comments"
                  className="form-control"
                  value={comments}
                  required
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Save Task
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ml-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
