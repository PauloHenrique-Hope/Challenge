import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { format } from "date-fns";
import { v4 as uuid } from 'uuid';
import { TaskData } from '@/app/page';


interface Tasks {
  id: string;
  name: string;
  isDone: boolean;
  createdAt: string;
}

interface TaskContextData {
  tasks: Tasks[];
  inputTask: string,
  handleCreateTask: () => void;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  
}

export const TaskContext = createContext({} as TaskContextData);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  
  const [tasks, setTasks] = useState<Tasks[]>([
    {
      id: '1',      
      name: 'react',
      isDone: false,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    },
    {
      id: '2',      
      name: 'react native',
      isDone: false,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    }
  ]);
  // useState: input Task
  const [inputTask, setInputTask] = useState<string>("")

  

  function handleCreateTask() {
    if(inputTask === "")return
    
    const newItem:TaskData = {
      id: uuid(),
      isDone: false,
      name: inputTask,
      createdAt: Date()
    }

    
    setTasks((tasks) => [...tasks, newItem])    
    setInputTask("") 

  }

  function handleInputChange(e: React.FormEvent<HTMLInputElement>){
    e.preventDefault();
    setInputTask(e.currentTarget.value)
  }


  const contextValues = {
    tasks,
    inputTask,
    setInputTask,
    handleCreateTask,
    handleInputChange,
  }

  return (
    <TaskContext.Provider value={contextValues}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  return useContext(TaskContext)

  // return context;
}

