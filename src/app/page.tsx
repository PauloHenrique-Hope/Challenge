'use client'

import styles from "./page.module.css";
import { useState } from "react";
import { Check, Trash } from 'lucide-react';
import { v4 as uuid } from 'uuid';



interface Task {
  id: string;
  task: string;
  isDone: boolean;
}

export default function Home() {
  
  const [task, setTask] = useState<string>("")
  const [items, setItems] = useState([] as any)
  
  const unique_id = uuid(); // Generate random ID
  const numItems = items.length


  function handleCreateTask(){

    if(task === "")return
    
    const newItem:Task = {task, id: unique_id, isDone: false}
    
    setItems((items:any) => [...items, newItem])
    setTask("")
    
  }

  function handleDeleteTask(id:number){
    setItems((items:any) => items.filter((item:any) => item.id !== id))
  }

  function handleCheckedTask(id:Task){
    setItems((items:any) => items.map((item:any) => item.id === id? {...item, isDone: !item.isDone }: item))
  }

  function handleClearList(){
    setItems([])
  }

  return (
    <main className={styles.main}>
      <h1>Todo App</h1>

      <div className={styles.form}>
        <input 
          id="task" 
          name="task" 
          placeholder="Add new task" 
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button type="button" onClick={handleCreateTask}>Criar</button>
      </div>

      <div className={styles.tasks}>
        <h2>Atividades</h2>
        <div className={styles.div}>
          <button className={styles.taskBtnClear} onClick={handleClearList}>Clear</button>
          <span>Total: {numItems}</span>
        </div>
      </div>

      <ul>
        {items.map((item:any) => (

          <li key={item.id} data-isdone={false} className={styles.task}>
            <span style={item.isDone ? { textDecoration: "line-through" } : {}}>{item.task}</span>
            <div>
              <button 
                style={item.isDone? {display: 'none'}: {}}
                onClick={()=>handleCheckedTask(item.id)}
                className={styles.taskBtnDone}>
                  <Check />
              </button>

              <button onClick={() => handleDeleteTask(item.id)}
                className={styles.taskBtnDelete}>
                  <Trash />
              </button>
            </div>
          </li>

        ))}
      
      </ul>
      
    </main>
  );
}
