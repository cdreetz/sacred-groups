import styles from '@components/Input.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...rest }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  return (
    <div 
      className={Utilities.classNames(
        styles.container,
        { [styles.focused]: isFocused },
        { [styles.error]: error }
      )}
    >
      {label && (
        <div className={styles.label}>
          <span className={styles.labelText}>{label}</span>
        </div>
      )}
      <div className={styles.inputWrapper}>
        <input
          className={Utilities.classNames(styles.input, className)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Input; 