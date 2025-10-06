import React from 'react';

const BoardCard = ({ board, onClick }) => {
  return (
    <div onClick={onClick} className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{board.name}</h2>
      <p className="text-sm text-gray-500">Members: {board.members?.length || 1}</p>
    </div>
  );
};

export default BoardCard;
