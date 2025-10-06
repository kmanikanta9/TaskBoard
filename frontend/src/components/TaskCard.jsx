import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-3 rounded shadow cursor-pointer"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.assignedTo?.name || 'Unassigned'}</p>
          <p className="text-sm text-gray-400">{new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
