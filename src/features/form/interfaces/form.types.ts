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

  useFormProps?: Omit<UseFormProps<TFieldValues>, 'defaultValues' | 'resolver'>;
  defaultValues?: DefaultValues<TFieldValues>;
  readOnly?: boolean;

  resetButtonText?: string;
  submitButtonText?: string;
  title?: string;

  slotProps?: {
    formContainerProps?: React.HTMLAttributes<HTMLFormElement>;
    titleProps?: TypographyProps;
    submitButtonProps?: ButtonProps;
    resetButtonProps?: ButtonProps & { hideResetButton?: boolean };
  };
}

export interface FormContextValues<T extends Record<string, unknown>> extends UseFormReturn<T> {
  readOnly?: boolean;
}
