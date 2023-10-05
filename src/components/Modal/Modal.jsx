import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export const Modal = ({ onBackgroundClick, children }) => {
  return createPortal(
    <>
      <div className={styles.modal} onClick={onBackgroundClick} />
      <div className={styles.modalContent}>{children}</div>
    </>,
    document.getElementById('modal'),
  );
};
