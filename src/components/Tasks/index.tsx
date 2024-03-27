import styles from './styles.module.css'
import React from 'react';
import {useTask} from '@/context/task';
import {TaskItem} from './TaskItem'

export function Tasks() {

  const {tasks } = useTask();

  return (    
    <ul>    
      {tasks.map((item) => (
        <TaskItem 
          key={item.id}
          data={item}
        />
      ))}      
    </ul>
  )
}