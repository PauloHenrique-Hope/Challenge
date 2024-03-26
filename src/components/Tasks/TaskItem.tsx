import { Check, Trash, Undo } from 'lucide-react';
import styles from './styles.module.css'

import { TaskData } from '@/app/page';

interface TaskItemProps {
  data: TaskData;
  onDeleteTask: (id: string) => void;
  onCheckedTask: (id: string) => void;
  onUndoTask: (id: string) => void;
}

export function TaskItem({data, onDeleteTask, onCheckedTask, onUndoTask}:TaskItemProps){
  return(    
    <li data-isdone={data.isDone} className={styles.task}>
      <span>{data.name}</span>
      <span>{data.createdAt}</span>
      <div>
        {data.isDone &&(
        <button onClick={() => onUndoTask(data.id)}
          className={styles.taskBtnDone}>
          <Undo />
        </button>
        )}
        {!data.isDone && (
          <button
            onClick={()=> onCheckedTask(data.id)}
            className={styles.taskBtnDone}>
              <Check />
          </button>
        )}
        <button onClick={() => onDeleteTask(data.id)}
          className={styles.taskBtnDelete}>
            <Trash />
        </button>
      </div>
    </li>    
  )
}