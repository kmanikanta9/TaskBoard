import React, { useState } from 'react';
import axios from '../api/axios';

const TaskModal = ({ columnId, boardId, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/tasks`, { title, description, assignedTo, dueDate, columnId, boardId });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border rounded" required />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}
            className="w-full p-2 border rounded" />
          <input type="text" placeholder="Assign To (User ID)" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}
            className="w-full p-2 border rounded" />
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
            className="w-full p-2 border rounded" required />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
