import styles from './TodoItem.module.css';
import { useCallback, useState } from 'react';

export const TodoItem = ({
  title,
  completed,
  className,
  onTodoToggle,
  onTodoDelete,
  onTodoUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleNewTitleChange = useCallback((event) => {
    setNewTitle(event.target.value);
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditMode((prevEditMode) => !prevEditMode);
  }, []);

  const handleModalCancel = useCallback(() => {
    setEditMode(false);
    setNewTitle(title);
  }, [title]);

  const handleModalAccept = useCallback(() => {
    setEditMode(false);
    onTodoUpdate(newTitle);
  }, [newTitle, onTodoUpdate]);

  return (
    <>
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
          <button onClick={toggleEditMode}>u</button>
          <button onClick={onTodoDelete}>x</button>
        </div>
      </div>

      {editMode && (
        <>
          <div className={styles.modal} onClick={handleModalCancel} />
          <div className={styles.modalContent}>
            <form onSubmit={handleModalAccept}>
              <input
                type='text'
                value={newTitle}
                onChange={handleNewTitleChange}
                className={styles.input}
              />
              <div className={styles.modalActions}>
                <button onClick={handleModalCancel} className={styles.modalButton} type='button'>
                  Cancel
                </button>
                <button className={styles.modalButton} type='submit'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
