'use client'

import { format} from "date-fns";
import { ptBR } from 'date-fns/locale';
import { v4 as uuid } from 'uuid';
import { TaskData } from '@/app/page';
import {createContext, useContext, useState, ReactNode,  Dispatch, SetStateAction, ChangeEvent, useEffect} from 'react';

interface Tasks {
  id: string;
  name: string;
  isDone: boolean;
  createdAt: string;
}


interface TaskContextData {
  tasks: Tasks[];
  inputTask: string;
  totalTasks: number;
  totalTasksDone: number;
  setInputTask: Dispatch<SetStateAction<string>>
  handleCreateTask: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteTask: (id: string) => void;
  handleClearList: () => void;
  handleCheckedTask: (id: string) => void;
  handleUndoTask: (id: string) => void;  
}

export const TaskContext = createContext({} as TaskContextData);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {  
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [inputTask, setInputTask] = useState<string>("")


  const today = new Date();
  const totalTasks = tasks.length; 
  const totalTasksDone = tasks.filter((task) => task.isDone === true ).length;

  useEffect(() => {
    const getTasks = JSON.parse(localStorage.getItem('tasks')!)
  
    if(getTasks.length > 0) return setTasks(getTasks);    
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTask(event.target.value)
  }


  function handleCreateTask() {
    if(inputTask === "")return
    
    const newItem:TaskData = {
      id: uuid(),
      name: inputTask,
      isDone: false,
      createdAt: format(today, "dd 'de' MMMM 'de' yyyy", {locale: ptBR}),
    }

    
    setTasks((tasks) => [...tasks, newItem])          
    setInputTask("") 
  }

  function handleDeleteTask(id: string){    
    setTasks((items) => items.filter((item) => item.id !== id))
  }

  function handleClearList(){
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (isConfirmed) setTasks([]);
    localStorage.removeItem('tasks')
  }

  function handleCheckedTask(id:string){
    const taskIndex = tasks.findIndex((task) => task.id === id);    
    tasks[taskIndex].isDone = !tasks[taskIndex].isDone;
    setTasks([...tasks])
  }

  function handleUndoTask(id:string){
    const taskIndex = tasks.findIndex((task) => task.id === id);    
    tasks[taskIndex].isDone = !tasks[taskIndex].isDone;
    setTasks([...tasks])
  }  

  return (
    <TaskContext.Provider value={{
      tasks,
      inputTask,
      totalTasks,
      totalTasksDone,
      setInputTask,
      handleCreateTask,
      handleInputChange,
      handleDeleteTask,
      handleClearList,
      handleCheckedTask,
      handleUndoTask,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  return context
}

