import type {
  UseFormReturn,
  DefaultValues,
  FieldValues,
  UseFormProps,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form';

import type { TypographyProps } from '@mui/material/Typography';
import type { ButtonProps } from '@mui/material/Button';

export interface FormProps<TFieldValues extends FieldValues> {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;

  onSubmit?: SubmitHandler<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
  onCancel?: () => void;

  useFormProps?: Omit<UseFormProps<TFieldValues>, 'defaultValues' | 'resolver'>;
  defaultValues?: DefaultValues<TFieldValues>;
  readOnly?: boolean;

  cancelButtonText?: string;
  hideCancelButton?: boolean;
  hideSubmitButton?: boolean;
  submitButtonText?: string;
  title?: string;

  slotProps?: {
    formContainerProps?: React.HTMLAttributes<HTMLFormElement>;
    titleProps?: TypographyProps;
    submitButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
  };
}

export interface FormContextValues<T extends Record<string, unknown>> extends UseFormReturn<T> {
  readOnly?: boolean;
}
