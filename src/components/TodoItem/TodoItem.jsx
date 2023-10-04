import styles from './TodoItem.module.css';

export const TodoItem = ({ title, completed, className }) => {
  return (
    <div className={`${styles.container} ${className ? className : ''}`}>
      <div className={styles.drag}>m</div>
      <p className={styles.title}>{title}</p>
      <div className={styles.actions}>
        <button>u</button>
        <button>x</button>
      </div>
    </div>
  );
};
