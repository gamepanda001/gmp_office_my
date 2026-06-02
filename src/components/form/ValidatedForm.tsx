import React from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css, cx } from '../../../styled-system/css';
import { formContainer, button } from '../../styles/recipes';
import type { UseFormReturn, SubmitHandler, DefaultValues } from 'react-hook-form';
import type { z } from 'zod';

export interface ValidatedFormProps<T extends Record<string, any>> {
  schema: z.ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: (formMethods: UseFormReturn<T>) => ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  submitButtonText?: string;
  submitButtonLoadingText?: string;
  submitButtonClassName?: string;
  submitButtonSize?: 'sm' | 'md' | 'full' | 'modal' | 'gameCta' | 'homeCta';
  resetButtonText?: string;
  showResetButton?: boolean;
  isSubmitting?: boolean;
  onReset?: () => void;
  disabled?: boolean;
}

export const ValidatedForm = <T extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  size = 'md',
  submitButtonText = 'Submit',
  submitButtonLoadingText = 'Submitting...',
  submitButtonClassName,
  submitButtonSize = 'sm',
  resetButtonText = 'Reset',
  showResetButton = false,
  isSubmitting = false,
  onReset,
  disabled = false,
}: ValidatedFormProps<T>) => {
  const formMethods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange', // 实时验证
    reValidateMode: 'onChange', // 提交后的重新验证模式
  });

  const { handleSubmit, reset, formState: { isDirty }, trigger } = formMethods;
  const handleReset = () => {
    reset();
    onReset?.();
  };

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('表单提交失败:', error);
    }
  };

  const handleSubmitWithValidation = async (e: React.FormEvent) => {
    e.preventDefault();
    // 手动触发所有字段的验证
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(handleFormSubmit)(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmitWithValidation}
      className={cx(
        formContainer({ size }),
        className
      )}
      noValidate
    >
      {children(formMethods)}
      
      <div className={css({
        display: 'flex',
        gap: '12px',
      })}>
        {showResetButton && (
          <button
            type="button"
            onClick={handleReset}
            disabled={disabled || !isDirty}
            className={button({ 
              visual: 'ghost', 
              color: 'primary',
              size: 'sm' 
            })}
          >
            {resetButtonText}
          </button>
        )}
        
        <button
          type="submit"
          disabled={disabled || isSubmitting}
          className={cx(button({ 
            visual: 'primary', 
            color: 'primary',
            size: submitButtonSize,
          }), submitButtonClassName)}
        >
          {isSubmitting ? submitButtonLoadingText : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default ValidatedForm; 