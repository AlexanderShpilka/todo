import styles from './TodoItem.module.css';

export const TodoItem = ({ title, completed, className, onTodoToggle, onTodoDelete }) => {
  return (
    <div
      className={`${styles.container} ${completed ? styles.completed : ''} ${
        className ? className : ''
      }`}
    >
      <div className={styles.drag}>m</div>
      <p className={styles.title} onClick={onTodoToggle}>
        {title}
      </p>
      <div className={styles.actions}>
        <button>u</button>
        <button onClick={onTodoDelete}>x</button>
      </div>
    </div>
  );
};
