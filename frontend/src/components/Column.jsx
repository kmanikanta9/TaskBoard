import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, boardId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded w-80 flex-shrink-0">
      <h2 className="font-bold text-xl mb-4">{column.name}</h2>
      <button onClick={() => setShowModal(true)} className="mb-4 bg-blue-500 text-white px-2 py-1 rounded">+ Add Task</button>
      <Droppable droppableId={column._id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[200px]">
            {column.tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showModal && <TaskModal columnId={column._id} boardId={boardId} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Column;
