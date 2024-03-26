'use client'

import { useState } from "react";
import { v4 as uuid } from 'uuid';

// Styles
import styles from "./page.module.css";

// Components
import Task from "../components/Tasks"




interface Task {
  id: string;
  name: string;
  isDone: boolean;
  createdAt: string;
}



// clean code, add new functions

/* 
* Imutabilidade
* Propriedade
* Component
*/ 

export default function Home() {  
  const [inputTask, setInputTask] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([]) 
  
  const totalTasks = tasks.length;  
  const totalTasksDone = tasks.filter((task) => task.isDone === true ).length;
  const tasksFormatted = tasks.map(function(task) {
    return {
      id: task.id,
      name: task.name,
      isDone: task.isDone,
      createdAt: new Date(task.createdAt).toLocaleDateString('pt-br', { dateStyle: "medium" })
    }
  })


  function handleCreateTask(){

    if(inputTask === "")return
    
    const newItem:Task = {
      id: uuid(),
      isDone: false,
      name: inputTask,
      createdAt: Date()
    }
    
    setTasks((tasks) => [...tasks, newItem])    
    setInputTask("") 
  }

  function handleDeleteTask(id:string){
    setTasks((items) => items.filter((item) => item.id !== id))
  }

  function handleCheckedTask<Props>(id:string){
    const taskIndex = tasks.findIndex((task) => task.id === id);    
    tasks[taskIndex].isDone = !tasks[taskIndex].isDone;
    setTasks([...tasks])
    
    // setTasks((items) => items.map((item) => item.id === id ? {...item, isDone: !item.isDone } : item))
  }

  function handleClearList(){

    const isConfirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (isConfirmed) setTasks([]);
  }
  
  function handleUndoTask(id:string){
    const taskIndex = tasks.findIndex((task) => task.id === id);    
    setTasks([...tasks])
    tasks[taskIndex].isDone = !tasks[taskIndex].isDone;
  }

  return (
    <main className={styles.main}>
      <h1>Todo App</h1>

      <div className={styles.form}>
        <input 
          id="task" 
          name="task" 
          placeholder="Add new task" 
          value={inputTask}
          onChange={e => setInputTask(e.target.value)}
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
      
      <Task tasksFormatted={tasksFormatted}
          onDeleteTask={handleDeleteTask}
          onCheckedTask={handleCheckedTask}
          onUndoTask={handleUndoTask}/>
    </main>
  );
}
