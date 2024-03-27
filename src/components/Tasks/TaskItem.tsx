import { Check, Trash, Undo } from 'lucide-react';
import styles from './styles.module.css'

import { TaskData } from '@/app/page';
import {useTask} from '@/context/task';

interface TaskItemProps {
  data: TaskData;
}

export function TaskItem({data}:TaskItemProps){

  const {handleDeleteTask, handleCheckedTask, handleUndoTask} = useTask();

  return(    
    <li data-isdone={data.isDone} className={styles.task}>
      <span>{data.name}</span>
      <span>{data.createdAt}</span>
      <div>
        {data.isDone &&(
        <button onClick={() => handleUndoTask(data.id)}
          className={styles.taskBtnDone}>
          <Undo />
        </button>
        )}
        {!data.isDone && (
          <button
            onClick={()=> handleCheckedTask(data.id)}
            className={styles.taskBtnDone}>
              <Check />
          </button>
        )}
        <button onClick={() => handleDeleteTask(data.id)}
          className={styles.taskBtnDelete}>
            <Trash />
        </button>
      </div>
    </li>    
  )
}