import { FormProvider, useForm, type FieldValues } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import type { FormProps, FormContextValues } from '../interfaces/form.types';

function Form<T extends FieldValues>({
  defaultValues,
  useFormProps,
  readOnly,

  header,
  children,
  footer,

  onSubmit = () => {},
  onError,

  slotProps = {},
  resetButtonText = 'Reset',
  submitButtonText = 'Submit',
  title,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    shouldFocusError: true,
    ...useFormProps,
  });

  const { handleSubmit, reset } = methods;

  const formContextValues: FormContextValues<T> = {
    ...methods,
    readOnly,
  };

  const onReset = () => {
    reset(defaultValues);
  };

  return (
    <FormProvider {...formContextValues}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        {...slotProps?.formContainerProps}
        className="tw:space-y-4"
      >
        {header ||
          (title && (
            <Typography
              variant="h4"
              className="tw:text-center tw:font-bold"
              {...slotProps?.titleProps}
            >
              {title}
            </Typography>
          ))}

        {children}

        {footer ||
          (readOnly ? null : (
            <div className="tw:flex tw:justify-end tw:gap-2">
              {!slotProps?.resetButtonProps?.hideResetButton && (
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  {...slotProps?.resetButtonProps}
                  onClick={onReset}
                >
                  {resetButtonText}
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                {...slotProps?.submitButtonProps}
              >
                {submitButtonText}
              </Button>
            </div>
          ))}
      </form>
    </FormProvider>
  );
}

export { Form };
