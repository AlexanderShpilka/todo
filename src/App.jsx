import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1 className='app-title'>Todos</h1>
    </div>
  );
}

export default App;
