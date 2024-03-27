'use client'

import styles from "./page.module.css";
import {Tasks} from "@/components/Tasks"
import { useTask } from "@/context/task";

export interface TaskData {
  id: string;
  name: string;
  isDone: boolean;
  createdAt: string;
}


export default function Home() {  

  const {inputTask, totalTasks, totalTasksDone, handleCreateTask, handleInputChange, handleClearList} = useTask()


  return (

      <main className={styles.main}>
        <h1>Todo App</h1>

        <div className={styles.form}>
          <input 
            id="task" 
            name="task" 
            placeholder="Add new task" 
            value={inputTask}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleCreateTask}>Criar</button>
        </div>

        <div className={styles.tasks}>
          <h2>Atividades</h2>
          <div className={styles.div}>
            <button className={styles.taskBtnClear} onClick={handleClearList}>Clear</button>
            <span>Total: {totalTasksDone}/{totalTasks}</span>
          </div>
        </div>
        
        <Tasks />
      </main>
   
  );
}
