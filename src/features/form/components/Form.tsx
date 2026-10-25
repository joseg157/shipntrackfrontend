import React from 'react';
import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type SubmitErrorHandler,
  type UseFormReturn,
} from 'react-hook-form';

import Button, { type ButtonProps } from '@mui/material/Button';

interface FormProps<
  TFormValues extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> {
  children: React.ReactNode;
  formMethods: UseFormReturn<TFormValues, TContext, TTransformedValues>;

  onSubmit: SubmitHandler<TTransformedValues>;
  onError?: SubmitErrorHandler<TFormValues>;
  onCancel?: () => void;

  // /** Hide the built-in action row entirely
  hideActions?: boolean;
  /** Replace the built-in action row completely. */
  renderActions?: (
    methods: UseFormReturn<TFormValues, TContext, TTransformedValues>,
  ) => React.ReactNode;

  slotProps?: {
    form?: React.HTMLAttributes<HTMLFormElement>;
    submitButton?: ButtonProps;
    cancelButton?: ButtonProps;
  };
}

function Form<
  TFormValues extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  children,
  formMethods,
  onSubmit = () => {},
  onError,
  onCancel,
  hideActions,
  renderActions,
  slotProps,
}: FormProps<TFormValues, TContext, TTransformedValues>) {
  const { handleSubmit, reset } = formMethods;

  const handleReset = () => {
    reset();
    onCancel?.();
  };

  const defaultRenderActions = (
    <div className="tw:flex tw:justify-end tw:gap-2">
      <Button type="submit" {...slotProps?.submitButton}>
        Submit
      </Button>

      <Button type="button" onClick={handleReset} {...slotProps?.cancelButton}>
        Cancel
      </Button>
    </div>
  );

  return (
    <FormProvider {...formMethods}>
      <form
        className="tw:space-y-4"
        onSubmit={handleSubmit(onSubmit, onError)}
        {...slotProps?.form}
      >
        {children}

        {!hideActions && (renderActions ? renderActions(formMethods) : defaultRenderActions)}
      </form>
    </FormProvider>
  );
}

export default Form;
