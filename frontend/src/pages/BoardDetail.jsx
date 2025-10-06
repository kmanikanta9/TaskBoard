import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Column from '../components/Column';
import { initSocket, getSocket } from '../utils/socket';
import { AuthContext } from '../contexts/AuthContext';
import { DragDropContext } from 'react-beautiful-dnd';

const BoardDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await axios.get(`/boards/${id}`);
        setBoard(res.data);
        setColumns(res.data.columns);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBoard();
  }, [id]);

  // Initialize Socket
  useEffect(() => {
    const socket = initSocket();
    socket.emit('joinBoard', id);

    socket.on('updateBoard', updatedColumns => {
      setColumns(updatedColumns);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    try {
      await axios.put(`/tasks/${draggableId}/move`, {
        sourceColumn: source.droppableId,
        destinationColumn: destination.droppableId,
        position: destination.index
      });
      // Server will emit 'updateBoard' for all clients
    } catch (err) {
      console.error(err);
    }
  };

  if (!board) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{board.name}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {columns.map(column => (
            <Column key={column._id} column={column} boardId={id} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default BoardDetail;
