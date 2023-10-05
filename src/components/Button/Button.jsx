import styles from './Button.module.css';

export const Button = ({ text, className, ...props }) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {text}
    </button>
  );
};
