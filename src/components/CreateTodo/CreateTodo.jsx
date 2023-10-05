import { useCallback, useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import styles from './CreateTodo.module.css';

export const CreateTodo = ({ onTodoCreate, className }) => {
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
    <form onSubmit={handleAddTodo} className={`${styles.container} ${className ? className : ''}`}>
      <Input
        type='text'
        value={todoTitle}
        onChange={handleTodoTitleChange}
        placeholder="What's next?"
        className={styles.input}
      />
      <Button text='Add' />
    </form>
  );
};
