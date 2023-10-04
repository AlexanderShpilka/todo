import styles from './Filter.module.css';

export const Filter = ({ options, className, onFilterChange }) => {
  return (
    <div className={className}>
      <select onChange={onFilterChange} className={styles.filter}>
        {options.map(({ value, label }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
