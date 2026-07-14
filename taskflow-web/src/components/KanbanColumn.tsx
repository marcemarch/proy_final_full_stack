import { useDroppable } from '@dnd-kit/core';

import type { Task, TaskStatus } from '../types';
import type { KanbanColumnConfig } from '../config/kanban';

import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  config: KanbanColumnConfig;
  tasks: Task[];

  onStatusChange: (
    taskId: string,
    newStatus: TaskStatus
  ) => void;

  onDelete: (
    taskId: string
  ) => void;

  onEdit: (
    task: Task
  ) => void;

  onComments: (
    task: Task
  ) => void;

  onAddTask?: () => void;
}

export function KanbanColumn({
  config,
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
  onComments,
  onAddTask
}: KanbanColumnProps) {

  const { setNodeRef, isOver } = useDroppable({
    id: config.id
  });

  return (

    <div

      ref={setNodeRef}

      className={`flex flex-col rounded-xl p-3 min-h-[200px]
      ${config.bgColor}
      ${isOver ? 'ring-2 ring-blue-400' : ''}`}

    >

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">

          <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} />

          <span className="text-sm font-semibold text-slate-700">
            {config.label}
          </span>

          <span className="text-xs bg-white border rounded-full px-2 py-0.5">
            {tasks.length}
          </span>

        </div>

        {config.id === 'TODO' && onAddTask && (

          <button
            onClick={onAddTask}
            className="text-slate-400 hover:text-blue-600 text-lg"
          >
            +
          </button>

        )}

      </div>

      <div className="flex flex-col gap-2 flex-1">

        {tasks.map(task => (

          <TaskCard

            key={task.id}

            task={task}

            onStatusChange={onStatusChange}

            onDelete={onDelete}

            onEdit={onEdit}

            onComments={onComments}

            isDragging={false}

          />

        ))}

        {tasks.length === 0 && (

          <div className="text-center py-8 text-slate-300 text-xs">

            Sin tareas

          </div>

        )}

      </div>

    </div>

  );

}