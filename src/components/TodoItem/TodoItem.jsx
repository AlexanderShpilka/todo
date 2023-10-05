import { useCallback, useEffect, useRef, useState } from 'react';
import { MenuOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from '../Button';
import styles from './TodoItem.module.css';

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

  const inputRef = useRef();

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

  useEffect(() => {
    const handleEscapeKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleModalCancel();
      }
    };
    if (editMode) {
      document.addEventListener('keydown', handleEscapeKeyDown);
      inputRef.current.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [editMode, handleModalCancel]);

  return (
    <>
      <div
        className={`${styles.container} ${completed ? styles.completed : ''} ${
          className ? className : ''
        }`}
      >
        <div className={styles.drag}>
          <MenuOutlined />
        </div>
        <p className={styles.title} onClick={onTodoToggle}>
          {title}
        </p>
        <div className={styles.actions}>
          <button onClick={toggleEditMode} className={styles.todoItemButton}>
            <EditOutlined />
          </button>
          <button onClick={onTodoDelete} className={styles.todoItemButton}>
            <DeleteOutlined />
          </button>
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
                ref={inputRef}
              />
              <div className={styles.modalActions}>
                <Button
                  text='Cancel'
                  className={styles.modalButton}
                  type='button'
                  onClick={handleModalCancel}
                />
                <Button text='Save' className={styles.modalButton} type='submit' />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
