import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';
import BoardCard from '../components/BoardCard';
import { useNavigate } from 'react-router-dom';

const Boards = () => {
  const { user } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const res = await axios.get('/boards');
      setBoards(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const createBoard = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/boards', { name });
      setBoards([...boards, res.data]);
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Boards</h1>
      {user.role === 'admin' && (
        <form onSubmit={createBoard} className="mb-6 flex gap-2">
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="New Board Name" className="border p-2 rounded flex-1" required />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map(board => (
          <BoardCard key={board._id} board={board} onClick={() => navigate(`/boards/${board._id}`)} />
        ))}
      </div>
    </div>
  );
};

export default Boards;
