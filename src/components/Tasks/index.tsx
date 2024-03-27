import styles from './styles.module.css'
import React from 'react';
import { Check, Trash, Undo } from 'lucide-react';

import {TaskData} from '@/app/page';
import {useTask} from '@/context/task';

import {TaskItem} from './TaskItem'

export type TasksProps = {
  onDeleteTask: (id: string) => void;
  onCheckedTask: (id: string) => void;
  onUndoTask: (id: string) => void;
  // tasksFormatted: TaskData[];
}

export function Tasks({
  onDeleteTask, onCheckedTask, onUndoTask}
:TasksProps) {

  const {tasks} = useTask();
  console.log(tasks)

  return (    
    <ul>    
      {tasks.map((item) => (
        <TaskItem 
          key={item.id}
          data={item}
          onDeleteTask={onDeleteTask} 
          onCheckedTask={onCheckedTask}
          onUndoTask={onUndoTask}
        />
      ))}      
    </ul>
  )
}