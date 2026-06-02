import React from 'react';
import { css, cx } from '../../../styled-system/css';
import { formField, formLabel, formError } from '../../styles/recipes';
import type { UseFormRegister, FieldError } from 'react-hook-form';

interface FormFieldProps {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'textarea';
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  help?: string;
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  size = 'md',
  className,
  help,
  rows = 3,
}) => {
  const fieldId = `field-${name}`;
  const hasError = !!error;
  const isTextarea = type === 'textarea';

  return (
    <div className={cx(css({ display: 'flex', flexDirection: 'column' }), className)}>
      {label && (
        <label 
          htmlFor={fieldId}
          className={cx(formLabel({ size, required }), css({ mb: '8px' }))}
        >
          {label}
        </label>
      )}
      
      {isTextarea ? (
        <textarea
          id={fieldId}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          {...register(name)}
          className={formField({ 
            size, 
            variant: hasError ? 'error' : 'default',
            display: 'textarea'
          })}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={formField({ 
            size, 
            variant: hasError ? 'error' : 'default',
            display: 'input'
          })}
        />
      )}
      
      {help && !hasError && (
        <p className={css({ 
          fontSize: '14px', 
          color: '#6B7280', 
          marginTop: '4px',
          lineHeight: '1.25' 
        })}>
          {help}
        </p>
      )}
      
      {hasError && (
        <div className={cx(formError({ size }), css({ mt: '4px' }))}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            className={css({ flexShrink: 0 })}
          >
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

export default FormField; 