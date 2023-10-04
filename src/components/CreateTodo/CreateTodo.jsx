import { useCallback, useState } from 'react';
import './CreateTodo.css';

export const CreateTodo = ({ onTodoCreate }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTodoTitleChange = useCallback((event) => {
    setTodoTitle(event.target.value);
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    onTodoCreate(todoTitle);
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleAddTodo} className='create-todo-container'>
      <input
        type='text'
        value={todoTitle}
        onChange={handleTodoTitleChange}
        placeholder="What's next?"
        className='input'
      />
      <button className='add-todo-button'>Add</button>
    </form>
  );
};
