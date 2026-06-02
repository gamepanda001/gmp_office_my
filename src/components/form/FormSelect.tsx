import { useState, useRef, useEffect } from 'react';
import { css, cx } from '../../../styled-system/css';
import { formLabel, formError } from '../../styles/recipes';
import { Controller } from 'react-hook-form';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
  label?: string;
  name: Path<TFieldValues>;
  options: Option[];
  placeholder?: string;
  control: Control<TFieldValues>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  help?: string;
}

const selectTriggerStyle = (hasError: boolean, size: 'sm' | 'md' | 'lg') => css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  textAlign: 'left',
  border: '1px solid',
  borderColor: hasError ? '#F74774' : '#E5E7EB',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  outline: 'none',
  '&:focus-visible': {
    borderColor: hasError ? '#F74774' : '#01B6CF',
    boxShadow: `0 0 0 3px rgba(${hasError ? '247, 71, 116' : '1, 182, 207'}, 0.1)`,
  },
  height: size === 'sm' ? '40px' : size === 'lg' ? '56px' : '46px',
  padding: size === 'sm' ? '0 12px' : size === 'lg' ? '0 20px' : '0 16px',
  fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
});

const selectDropdownStyle = css({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  padding: '4px',
  listStyle: 'none',
  zIndex: 10,
  maxHeight: '240px',
  overflowY: 'auto',
});

const selectOptionStyle = (isSelected: boolean, isDisabled?: boolean) => css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  color: isDisabled ? '#9CA3AF' : '#1F2937',
  backgroundColor: isSelected ? 'rgba(1, 182, 207, 0.1)' : 'transparent',
  fontWeight: isSelected ? '600' : '400',
  '&:hover': {
    backgroundColor: isDisabled ? 'transparent' : isSelected ? 'rgba(1, 182, 207, 0.1)' : 'rgba(0, 0, 0, 0.04)',
  },
});

export function FormSelect<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  options,
  placeholder = '请选择...',
  control,
  error,
  required = false,
  disabled = false,
  size = 'md',
  className,
  help,
}: FormSelectProps<TFieldValues>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const fieldId = `select-${name}`;
  const hasError = !!error;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cx(css({ display: 'flex', flexDirection: 'column', width: '100%' }), className)}>
      {label && (
        <label htmlFor={fieldId} className={cx(formLabel({ size, required }), css({ mb: '8px' }))}>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedOption = options.find(option => option.value === field.value);

          return (
            <div ref={selectRef} className={css({ position: 'relative' })}>
              <button
                id={fieldId}
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={selectTriggerStyle(hasError, size)}
              >
                <span className={css({ color: selectedOption ? '#1F2937' : '#9CA3AF' ,fontWeight: "700"})}>
                  {selectedOption?.label || placeholder}
                </span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={css({ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#6B7280' })}>
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isOpen && (
                <ul className={selectDropdownStyle}>
                  {options.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        if (!option.disabled) {
                          field.onChange(option.value);
                          setIsOpen(false);
                        }
                      }}
                      className={selectOptionStyle(field.value === option.value, option.disabled)}
                    >
                      <span>{option.label}</span>
                      {field.value === option.value && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#01B6CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      />
      
      {help && !hasError && (
        <p className={css({ fontSize: '14px', color: '#6B7280', marginTop: '4px', lineHeight: '1.25' })}>
          {help}
        </p>
      )}
      
      {hasError && (
        <div className={cx(formError({ size }), css({ mt: '4px' }))}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className={css({ flexShrink: 0 })}>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
}

export default FormSelect; 
