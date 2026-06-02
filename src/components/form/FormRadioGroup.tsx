import { css, cx } from '../../../styled-system/css';
import { formRadio, formRadioInput, formLabel, formError } from '../../styles/recipes';
import { Controller } from 'react-hook-form';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';

interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface FormRadioGroupProps<TFieldValues extends FieldValues = FieldValues> {
  label?: string;
  name: Path<TFieldValues>;
  options: RadioOption[];
  control: Control<TFieldValues>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  help?: string;
  direction?: 'horizontal' | 'vertical';
}

export function FormRadioGroup<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  options,
  control,
  error,
  required = false,
  disabled = false,
  size = 'md',
  className,
  help,
  direction = 'vertical',
}: FormRadioGroupProps<TFieldValues>) {
  const fieldsetId = `radio-group-${name}`;
  const hasError = !!error;

  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
      {label && (
        <legend 
          className={formLabel({ size, required })}
        >
          {label}
        </legend>
      )}
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <fieldset
            id={fieldsetId}
            disabled={disabled}
            className={cx(
              css({
                border: 'none',
                padding: '0',
                margin: '0',
                display: 'flex',
                flexDirection: direction === 'horizontal' ? 'row' : 'column',
                gap: direction === 'horizontal' ? '16px' : '12px',
                flexWrap: direction === 'horizontal' ? 'wrap' : 'nowrap',
              }),
              className
            )}
          >
            {options.map((option) => {
              const optionId = `${name}-${option.value}`;
              const isChecked = field.value === option.value;
              
              return (
                <label
                  key={option.value}
                  htmlFor={optionId}
                  className={formRadio({ size })}
                >
                  <input
                    id={optionId}
                    type="radio"
                    value={option.value}
                    checked={isChecked}
                    disabled={option.disabled || disabled}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={formRadioInput({ 
                      variant: hasError ? 'error' : 'default' 
                    })}
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </fieldset>
        )}
      />
      
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
        <div className={formError({ size })}>
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
}

export default FormRadioGroup; 
