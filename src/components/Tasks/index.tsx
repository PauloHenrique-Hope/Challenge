
import styles from './styles.module.css'
import { Check, Trash, Undo } from 'lucide-react';

//Components
import TaskItem from './TaskItem'
import React from 'react';


type Props = {
  onCreateTask: React.MouseEventHandler;
  onDeleteTask: React.MouseEventHandler;
  onCheckedTask: React.MouseEventHandler;
  onUndoTask: React.MouseEventHandler;
  tasksFormatted: any;
}



export default function Tasks({tasksFormatted, onDeleteTask, onCheckedTask, onUndoTask}:Props) {
  return (
    
      <ul>
        {/* <TaskItem tasksFormatted={tasksFormatted}
          onDeleteTask={onDeleteTask}
          onCheckedTask={onCheckedTask}
          onUndoTask={onUndoTask}/> */}
        {tasksFormatted.map((item:any) => (
            <li key={item.id} data-isdone={item.isDone} className={styles.task}>
              <span>{item.name}</span>
      
              <span>{item.createdAt}</span>
              <div>
                {item.isDone &&(
                <button onClick={() => onUndoTask(item.id)}
                  className={styles.taskBtnDone}>
                  <Undo />
                </button>
                )}
                {!item.isDone && (
                  <button
                    onClick={()=> onCheckedTask(item.id)}
                    className={styles.taskBtnDone}>
                      <Check />
                  </button>
                )}
                <button onClick={() => onDeleteTask(item.id)}
                  className={styles.taskBtnDelete}>
                    <Trash />
                </button>
              </div>
            </li>
          ))}
          
        </ul>
  )
}