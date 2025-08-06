import React, { useState, forwardRef } from 'react';
import styles from './Input.module.scss';

export interface InputProps {
  type?: 'text' | 'password' | 'number' | 'email';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  clearable?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value = '',
      onChange,
      clearable = false,
      disabled = false,
      className = '',
      id,
      name,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);
    };

    const handleClear = () => {
      setInputValue('');
      onChange?.('');
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className={`${styles.inputContainer} ${className}`}>
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled}
            className={styles.inputField}
            id={id}
            name={name}
          />

          {type === 'password' && (
            <button
              type="button"
              className={`${styles.inputIcon} ${styles.passwordToggle}`}
              onClick={togglePasswordVisibility}
              disabled={disabled}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          )}

          {clearable && inputValue && (
            <button
              type="button"
              className={`${styles.inputIcon} ${styles.clearButton}`}
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear input"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);
