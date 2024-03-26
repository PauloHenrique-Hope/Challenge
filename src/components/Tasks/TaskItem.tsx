import { Check, Trash, Undo } from 'lucide-react';
import styles from './styles.module.css'

import { TasksProps } from './index';


export function TaskItem({tasksFormatted, onDeleteTask, onCheckedTask, onUndoTask}:TasksProps){
  return(
    <div>
      {tasksFormatted.map((item) => (
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
    </div>
  )
}