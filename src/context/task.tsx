import {createContext, useState, ReactNode, useContext} from 'react';
import { TaskData } from '@/app/page';
import { v4 as uuid } from 'uuid';

interface Tasks {
  id: string;
  name: string;
  isDone: boolean;
  createdAt: string | number;
}

interface TaskContextData {
  tasks: Tasks[];
  handleCreateTask: () => void;
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
      createdAt: Date.now(),
    },
    {
      id: '2',      
      name: 'react native',
      isDone: false,
      createdAt: Date.now(),
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

  return (
    <TaskContext.Provider value={{ tasks, handleCreateTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)

  return context;
}