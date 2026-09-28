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

  slotProps?: {
    formContainerProps?: React.HTMLAttributes<HTMLFormElement>;
    titleProps?: TypographyProps;
    submitButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
  };

  // React Hook Form return object, this option allows you to access the form methods outside the form component.
  formReturn?: UseFormReturn<TFieldValues>;
}

export interface FormContextValues<
  TFieldValues extends FieldValues,
> extends UseFormReturn<TFieldValues> {
  readOnly?: boolean;
}
