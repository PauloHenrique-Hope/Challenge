import { Check, Trash, Undo } from 'lucide-react';
import styles from './styles.module.css'

type Props = {
   onCreateTask: React.MouseEventHandler;
   onDeleteTask: React.MouseEventHandler;
   onCheckedTask: React.MouseEventHandler;
   onUndoTask: React.MouseEventHandler;
   tasksFormatted: any;
 }


export default function TaskItem({tasksFormatted, onDeleteTask, onCheckedTask, onUndoTask}:Props) {
   return (
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
   ) 
}