import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodo } from './components/CreateTodo';
import { TodoItem } from './components/TodoItem';
import { Filter } from './components/Filter';
import { filterConfig, FILTER_VALUES, TODOS_LOCAL_STORAGE_KEY } from './config';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
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

  useEffect(() => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const draggedTodoRef = useRef(null);
  const draggedOverTodoRef = useRef(null);

  const onDragStart = useCallback((index) => {
    return () => {
      draggedTodoRef.current = index;
    };
  }, []);

  const onDragEnter = useCallback((index) => {
    return () => {
      draggedOverTodoRef.current = index;
    };
  }, []);

  const onDragEnd = useCallback(() => {
    let updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(draggedTodoRef.current, 1);
    updatedTodos.splice(draggedOverTodoRef.current, 0, draggedTodo);
    draggedTodoRef.current = null;
    draggedOverTodoRef.current = null;
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todos</h1>
      <CreateTodo onTodoCreate={addTodo} className={styles.createTodo} />
      <Filter
        className={styles.filter}
        options={filterConfig}
        onFilterChange={handleTodoStatusFilterChange}
      />
      {filteredTodos.map((todo, index) => (
        <div
          key={todo.id}
          draggable
          onDragStart={onDragStart(index)}
          onDragEnter={onDragEnter(index)}
          onDragEnd={onDragEnd}
          onDragOver={(event) => event.preventDefault()}
        >
          <TodoItem
            title={todo.title}
            completed={todo.completed}
            className={styles.todoItem}
            onTodoToggle={toggleTodo(todo.id)}
            onTodoDelete={deleteTodo(todo.id)}
            onTodoUpdate={updateTodo(todo.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
