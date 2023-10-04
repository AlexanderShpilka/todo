import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodo } from './components/CreateTodo';
import { TodoItem } from './components/TodoItem';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  const toggleTodo = useCallback(
    (todoId) => {
      return () => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
      };
    },
    [todos],
  );

  const deleteTodo = useCallback(
    (todoId) => {
      return () => {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
      };
    },
    [todos],
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todos</h1>
      <CreateTodo onTodoCreate={addTodo} className={styles.createTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          className={styles.todoItem}
          onTodoToggle={toggleTodo(todo.id)}
          onTodoDelete={deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}

export default App;
