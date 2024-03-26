import styles from './styles.module.css'
import React from 'react';
import { Check, Trash, Undo } from 'lucide-react';

import {TaskData} from '@/app/page';

import {TaskItem} from './TaskItem'

export type TasksProps = {
  onDeleteTask: (id: string) => void;
  onCheckedTask: (id: string) => void;
  onUndoTask: (id: string) => void;
  tasksFormatted: TaskData[];
}

export function Tasks({
  tasksFormatted, onDeleteTask, onCheckedTask, onUndoTask}
:TasksProps) {
  return (    
    <ul>    
      <TaskItem tasksFormatted={tasksFormatted}
        onDeleteTask={onDeleteTask}
        onCheckedTask={onCheckedTask}
        onUndoTask={onUndoTask}/>
    </ul>
  )
}