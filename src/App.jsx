import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodo } from './components/CreateTodo';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div className='app-container'>
      <h1 className='app-title'>Todos</h1>
      <CreateTodo onTodoCreate={addTodo} />
    </div>
  );
}

export default App;
