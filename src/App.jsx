import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodo } from './components/CreateTodo';
import { TodoItem } from './components/TodoItem';
import { Filter } from './components/Filter';
import { filterConfig, FILTER_VALUES } from './config/filter';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoStatus, setTodoStatus] = useState(FILTER_VALUES.ALL);

  const addTodo = useCallback((title) => {
    if (!title.trim()) {
      return;
    }
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

  const updateTodo = useCallback(
    (todoId) => {
      return (newTitle) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              title: newTitle,
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
      };
    },
    [todos],
  );

  const handleTodoStatusFilterChange = useCallback((event) => {
    setTodoStatus(event.target.value);
  }, []);

  const filteredTodos = useMemo(() => {
    switch (todoStatus) {
      case FILTER_VALUES.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case FILTER_VALUES.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todoStatus, todos]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todos</h1>
      <CreateTodo onTodoCreate={addTodo} className={styles.createTodo} />
      <Filter
        className={styles.filter}
        options={filterConfig}
        onFilterChange={handleTodoStatusFilterChange}
      />
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          className={styles.todoItem}
          onTodoToggle={toggleTodo(todo.id)}
          onTodoDelete={deleteTodo(todo.id)}
          onTodoUpdate={updateTodo(todo.id)}
        />
      ))}
    </div>
  );
}

export default App;
