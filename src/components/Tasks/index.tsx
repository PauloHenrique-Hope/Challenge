// ul = tasks
// li = task

import { Check, Trash, Undo } from 'lucide-react';
import styles from './styles.module.css'

// interface Task {
//   id: string;
//   name: string;
//   isDone: boolean;
//   createdAt: string;
// }


// interface tasksFormatted {
//   id: task.id,
//   name: task.name,
//   isDone: task.isDone,
//   createdAt: new Date(task.createdAt).toLocaleDateString('pt-br', { dateStyle: "medium" })
// }


export default function Tasks({tasksFormatted, onCreateTask, onDeleteTask, onCheckedTask, onClearList, onUndoTask}) {
  return (
    <div>
      <ul>
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
        </ul>
    </div>
  )
}